import { gql } from 'apollo-server';

const typedefs = gql`
  interface MutationResponse {
      code: String!
      success: Boolean!
      message: String!
  }
`;

export default typedefs;
