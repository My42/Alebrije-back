import signUp from './signUp';
import signIn from './signIn';
import forgotPassword from './forgotPassword';
import reservations from './reservations';
import addReservation from './addReservation';
import cancelReservation from './cancelReservation';

const resolvers = {
  Query: {
    me: () => 'me',
    reservations,
  },
  Mutation: {
    addReservation,
    forgotPassword,
    signUp,
    cancelReservation,
    signIn,
  },
};

export default resolvers;
