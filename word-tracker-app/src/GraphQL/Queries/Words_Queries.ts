import { gql } from "@apollo/client";

export const GET_WORDS = gql`
  query GetWords($userId: String!) {
    getWords(userId: $userId) {
      id
      word
      language
      meaning
      exampleSentence
      createdAt
    }
  }
`;