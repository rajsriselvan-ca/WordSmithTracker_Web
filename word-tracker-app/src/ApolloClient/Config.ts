import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://wordsmith-qeyb.onrender.com/graphql", 
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getWords: {
            keyArgs: ["userId", "page", "limit"],
            merge(
              existing = { words: [], total: 0 },
              incoming = { words: [], total: 0 },
              { args }
            ) {
              if (!args) return incoming;
              const { page, limit } = args;
              const startIndex = (page - 1) * limit;
              const mergedWords = [...existing.words];
              for (let i = 0; i < incoming.words.length; i++) {
                mergedWords[startIndex + i] = incoming.words[i];
              }
              const trimmedWords = mergedWords.slice(0, incoming.total);
              return {
                ...incoming,
                words: trimmedWords,
              };
            },
          },
        },
      },
    },
  }),
}); 
