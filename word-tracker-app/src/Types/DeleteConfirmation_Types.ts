import { ApolloCache } from "@apollo/client";

export interface DeleteConfirmationModalProps {
    id: string;
    userId: string;
    deleteWord: (options: {
      variables: { id: string };
      update: (cache: ApolloCache<any>) => void;
    }) => Promise<any>;
    onSuccess: () => void;
    onError: (error: string) => void;
    cacheQuery: any;
  }