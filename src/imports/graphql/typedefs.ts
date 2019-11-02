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

    type ReservingMutationResponse implements MutationResponse {
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
        drinkOrders: [DrinkOrder]
    }
    
    type DrinkOrder {
        drink: Drink
        quantity: Int
    }
    
    type onReservingResponse {
        reservedTableCount: Int
    }
    
    type deleteAccountMutationResponse implements MutationResponse {
        success: Boolean!
        message: String!
        code: String!
    }
    
    type UpdatAccountMutationResponse implements MutationResponse {
        code: String!
        message: String!
        success: Boolean!
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
        year: Int!
        userId: Int
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
    
    input ReservingMutationInput {
        date: String,
        reservedTableCount: Int
    }
    
    input UpdateAccountMutationInput {
        password: String
    }
    
    type Query {
        reservations(input: ReservationsQueryInput!) : [Reservation]
        drinks : [Drink]!
        me: User!
    }

    type Mutation {
        addReservation(input: AddReservationMutationInput!): AddReservationMutationResponse
        cancelReservation(input: CancelReservationMutationInput!): CancelReservationMutationResponse
        deleteAccount: deleteAccountMutationResponse
        forgotPassword(input: ForgotPasswordMutationInput!): ForgotPasswordResponse
        reserving(input: ReservingMutationInput): ReservingMutationResponse
        signIn(input: SignInQueryInput!): SignInQueryResponse
        signUp(input: SignUpMutationInput!): SignUpMutationResponse
        stopReserving(input: ReservingMutationInput): ReservingMutationResponse
        updateAccount(input: UpdateAccountMutationInput!) : UpdatAccountMutationResponse
    }

    type Subscription {
        onReserving(date: String): onReservingResponse
    }
`;

export default typedefs;
