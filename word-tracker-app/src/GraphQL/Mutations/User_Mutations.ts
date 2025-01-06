import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $dailyGoal: Int!, $createdAt: String!) {
    createUser(username: $username, email: $email, dailyGoal: $dailyGoal, createdAt: $createdAt) {
      username
      email
      dailyGoal
      createdAt
    }
  }
`;
