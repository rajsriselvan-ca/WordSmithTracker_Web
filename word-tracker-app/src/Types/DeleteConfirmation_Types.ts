export interface DeleteConfirmationModalProps {
  id: string;
  userId: string;
  deleteWord: (args: any) => Promise<any>;
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
  cacheQuery: any;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalRecords: number;
  loadWords: (args: { variables: { userId: string; page: number; limit: number } }) => void;  // Add loadWords
}
