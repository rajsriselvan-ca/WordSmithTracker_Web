import { gql } from "@apollo/client";

export const ADD_WORD = gql`
  mutation AddWord(
    $userId: String!
    $word: String!
    $language: String!
    $meaning: String!
    $exampleSentence: String!
    $createdAt: String!
  ) {
    addWord(
      userId: $userId
      word: $word
      language: $language
      meaning: $meaning
      exampleSentence: $exampleSentence
      createdAt: $createdAt
    ) {
      id
      word
      language
      meaning
      exampleSentence
      createdAt
    }
  }
`;

export const DELETE_WORD = gql`
mutation DeleteWord($id: ID!) {
  deleteWord(id: $id)
}
`;

export const EDIT_WORD = gql`
mutation EditWord(
  $id: ID!
  $userId: String!
  $word: String
  $language: String
  $meaning: String
  $exampleSentence: String
  $createdAt: String
) {
  editWord(
    id: $id
    userId: $userId
    word: $word
    language: $language
    meaning: $meaning
    exampleSentence: $exampleSentence
    createdAt: $createdAt
  ) {
    id
    userId
    word
    language
    meaning
    exampleSentence
    createdAt
  }
}
`;