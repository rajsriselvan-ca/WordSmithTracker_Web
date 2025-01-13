import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: "http://localhost:2929/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getWords: {
            merge(_, incoming) {
              return incoming; 
            },
          },
        },
      },
    },
  }),
});

