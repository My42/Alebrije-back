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
    
    type AddReservationMutationResponse implements MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }
    
    type ForgotPasswordResponse implements MutationResponse {
        code: String!
        message: String!
        success: Boolean!
    }

    type CancelReservationMutationResponse implements MutationResponse {
        code: String!
        message: String!
        success: Boolean!
    }

    type Drink {
        id: Int!
        label: String!
        price: Int!
        volume: Int!
    }
    
    type Reservation {
        id: Int!,
        date: String!,
        tableNumber: Int!,
        drinkOrders: [DrinkOrder]
    }
    
    type DrinkOrder {
        drink: Drink
        quantity: Int
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

    input ForgotPasswordMutationInput {
        email: String!
        token: String
        newPassword: String
    }

    input ReservationsQueryInput {
        month: Int
        year: Int
    }
    
    input DrinkOrderInput {
        drinkId: Int
        quantity: Int
    }
    
    input AddReservationMutationInput {
        date: String
        tableNumber: Int
        drinkOrders: [DrinkOrderInput]
    }
    
    input CancelReservationMutationInput {
        id: Int
    }
    
    type Query {
        me: String
        signIn(input: SignInQueryInput!): SignInQueryResponse
        reservations(input: ReservationsQueryInput!) : [Reservation]
    }

    type Mutation {
        signUp(input: SignUpMutationInput!): SignUpMutationResponse
        forgotPassword(input: ForgotPasswordMutationInput!): ForgotPasswordResponse
        addReservation(input: AddReservationMutationInput!): AddReservationMutationResponse
        cancelReservation(input: CancelReservationMutationInput!): CancelReservationMutationResponse
    }
`;

export default typedefs;
