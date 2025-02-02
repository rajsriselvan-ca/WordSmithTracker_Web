import { ApolloCache } from "@apollo/client";
import { DocumentNode } from "graphql";

export interface DeleteConfirmationModalProps {
    id: string;
    userId: string;
    deleteWord: (options: {
      variables: { id: string };
      update: (cache: ApolloCache<unknown>) => void;
    }) => Promise<unknown>;
    onSuccess: () => void;
    onError: (error: string) => void;
    cacheQuery: DocumentNode;
}