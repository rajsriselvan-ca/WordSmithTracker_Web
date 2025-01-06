import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      id
      email
      username
      dailyGoal
    }
  }
`;