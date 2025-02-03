import React from "react";
import { Modal, message, Button } from "antd";
import { ApolloCache } from "@apollo/client";  
import { GetWordsResponse, Word } from "../Types/Word_Types";
import { DeleteConfirmationModalProps } from "../Types/DeleteConfirmation_Types";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  id,
  userId,
  deleteWord,
  onSuccess,
  onError,
  cacheQuery,
  currentPage,
  setCurrentPage,
  totalRecords,
  loadWords,  
}) => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this word?",
      okButtonProps: {
        style: { backgroundColor: "red", color: "white" },
      },
      onOk: async () => {
        try {
          await deleteWord({
            variables: { id },
            update: (cache: ApolloCache<any>) => {
              const existingWords = cache.readQuery<GetWordsResponse>({
                query: cacheQuery,
                variables: { userId, page: currentPage, limit: 4 },
              });
              if (existingWords?.getWords?.words) {
                const updatedWords = existingWords.getWords.words.filter((word: Word) => word.id !== id);
                cache.writeQuery({
                  query: cacheQuery,
                  variables: { userId, page: currentPage, limit: 4 },
                  data: {
                    getWords: {
                      __typename: "PaginatedWords",
                      words: updatedWords,
                      total: existingWords.getWords.total - 1,
                    },
                  },
                });
                if (updatedWords.length === 0 && currentPage > 1) {
                  cache.evict({ fieldName: "getWords" });
                }
              }
            },
          });
          message.success("Word deleted successfully");
          if (totalRecords % 4 === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            onSuccess();
            return loadWords({ variables: { userId, page: currentPage - 1, limit: 4 } });
          }
          onSuccess();
          return loadWords({ variables: { userId, page: currentPage, limit: 4 }});
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
          onError(errorMessage);
        }
      },
    });
  };

  return (
    <Button onClick={showDeleteConfirm} danger>
      Delete
    </Button>
  );
};

export default DeleteConfirmationModal;
