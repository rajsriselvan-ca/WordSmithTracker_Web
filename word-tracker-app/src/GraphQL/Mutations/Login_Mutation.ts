import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!) {
    loginUser(email: $email) {
      token
      user {
        id
        username
        email
        dailyGoal
      }
    }
  }
`;
