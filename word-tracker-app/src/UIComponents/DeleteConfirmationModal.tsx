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
                cache.writeQuery({
                  query: cacheQuery,
                  variables: { userId, page: 1, limit: 4 },
                  data: {
                    getWords: {
                      __typename: "PaginatedWords",
                      words: existingWords.getWords.words.filter(
                        (word) => word.id !== id
                      ),
                      total: existingWords.getWords.total - 1,
                    },
                  },
                });
              }
            },
          });
          message.success("Word deleted successfully");
          onSuccess();
        } catch (error: any) {
          const errorMessage =
            error?.message || "An unexpected error occurred.";
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
