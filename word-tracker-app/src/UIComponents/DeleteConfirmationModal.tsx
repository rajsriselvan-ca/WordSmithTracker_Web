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
                variables: { userId },
              });
              if (existingWords) {
                cache.writeQuery({
                  query: cacheQuery,
                  variables: { userId },
                  data: {
                    getWords: existingWords.getWords.filter(
                      (word) => word.id !== id
                    ),
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
    <Button
      onClick={showDeleteConfirm}
      danger
    >
      Delete
    </Button>
  );
};

export default DeleteConfirmationModal;
