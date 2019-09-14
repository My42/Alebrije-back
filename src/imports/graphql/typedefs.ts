import { gql } from 'apollo-server';

const typedefs = gql`
  interface MutationResponse {
      code: String!
      success: Boolean!
      message: String!
  }

  type SignInMutationResponse implements MutationResponse {
      code: String!
      success: Boolean!
      message: String!
      token: String
  }
  
  type SignUpMutationResponse implements MutationResponse {
      code: String!
      success: Boolean!
      message: String!
  }
  
  type Query {
      me: String
  }
  
  input SignUpMutationInput {
      fullName: String!
      email: String!
      password: String!
  }
  
  input SignInMutationInput {
      email: String!
      password: String!
  }
  
  type Mutation {
    signUp(input: SignUpMutationInput!): SignUpMutationResponse
    signIn(input: SignInMutationInput!): SignInMutationResponse
  }
`;

export default typedefs;
