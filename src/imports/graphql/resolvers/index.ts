import signUp from './signUp';
import signIn from './signIn';
import forgotPassword from './forgotPassword';
import reservations from './reservations';
import addReservation from "./addReservation";

const resolvers = {
  Query: {
    me: () => 'me',
    reservations,
    signIn,
  },
  Mutation: {
    addReservation,
    forgotPassword,
    signUp,
  },
};

export default resolvers;
