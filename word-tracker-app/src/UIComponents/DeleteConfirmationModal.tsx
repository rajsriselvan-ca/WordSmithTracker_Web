import React from "react";
import { Modal, message, Button } from "antd";
import { GetWordsResponse } from "../Types/Word_Types";
import { DeleteConfirmationModalProps } from "../Types/DeleteConfirmation_Types";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  id,
  userId,
  deleteWord,
  onSuccess,
  onError,
  cacheQuery,
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
            update: (cache) => {
              const existingWords = cache.readQuery<GetWordsResponse>({
                query: cacheQuery,
                variables: { userId, page: 1, limit: 4 },
              });
              if (existingWords?.getWords?.words) {
                const updatedWords = existingWords.getWords.words.filter(
                  (word) => word.id !== id
                );
                cache.writeQuery({
                  query: cacheQuery,
                  variables: { userId, page: 1, limit: 4 },
                  data: {
                    getWords: {
                      __typename: "PaginatedWords",
                      words: updatedWords,
                      total: existingWords.getWords.total - 1,
                    },
                  },
                });
              }
            },
          });
          message.success("Word deleted successfully");
          onSuccess();
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
