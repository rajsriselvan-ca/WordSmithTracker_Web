import { gql } from "@apollo/client";

export const GET_WORDS = gql`
  query GetWords($userId: String!, $page: Int, $limit: Int) {
    getWords(userId: $userId, page: $page, limit: $limit) {
      words {
        id
        word
        language
        meaning
        exampleSentence
        createdAt
      }
      total
    }
  }
`;