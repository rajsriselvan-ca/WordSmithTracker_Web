import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";

const httpLink = new HttpLink({
  uri: "https://wordsmith-qeyb.onrender.com/graphql",
});

const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    if (error && error.networkError) {
      return count < 3; 
    }
    return false;
  },
  delay: (count) => Math.min(1000 * 2 ** count, 5000), 
});

export const client = new ApolloClient({
  link: from([retryLink, httpLink]), 
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
