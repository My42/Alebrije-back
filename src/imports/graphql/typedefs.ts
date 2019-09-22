import { gql } from 'apollo-server';

const typedefs = gql`
    interface MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }

    type User {
        id: Int
        email: String!
        fullName: String!
    }

    type SignInQueryResponse implements MutationResponse {
        code: String!
        success: Boolean!
        message: String!
        token: String
        me: User
    }

    type SignUpMutationResponse implements MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }

    input SignUpMutationInput {
        fullName: String!
        email: String!
        password: String!
    }

    input SignInQueryInput {
        email: String!
        password: String!
    }

    type Query {
        me: String
        signIn(input: SignInQueryInput!): SignInQueryResponse
    }

    type Mutation {
        signUp(input: SignUpMutationInput!): SignUpMutationResponse
    }
`;

export default typedefs;
