import { Dispatch, SetStateAction } from "react";

export interface EditWordModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  formState: {
    id: string;
    userId: string;
    word: string;
    language: string;
    meaning: string;
    exampleSentence: string;
    createdAt: string;
  };
  setFormState: Dispatch<SetStateAction<{
    id: string;
    userId: string;
    word: string;
    language: string;
    meaning: string;
    exampleSentence: string;
    createdAt: string;
  }>>;
  languageData: { id: string; name: string }[] | undefined;
  saving: boolean;
  handleSaveEdit: () => void;
}