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
    setFormState: (state: any) => void;
    languageData: { id: string; name: string }[] | undefined;
    saving: boolean;
    handleSaveEdit: () => void;
  }