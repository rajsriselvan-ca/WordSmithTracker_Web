import { gql } from "@apollo/client";

export const GET_LANGUAGES = gql`
  query GetLanguages {
    getLanguages {
      id
      name
    }
  }
`;