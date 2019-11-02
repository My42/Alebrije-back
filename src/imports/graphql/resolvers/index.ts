import signUp from './signUp';
import signIn from './signIn';
import forgotPassword from './forgotPassword';
import reservations from './reservations';
import addReservation from './addReservation';
import cancelReservation from './cancelReservation';
import reserving from './reserving';
import { onReserving } from '../subscriptions';
import stopReserving from './stopReserving';
import updateAccount from './updateAccount';
import deleteAccount from './deleteAccount';
import drinks from './drinks';
import me from './me';

const resolvers = {
  Query: {
    drinks,
    me,
    reservations,
  },
  Mutation: {
    addReservation,
    forgotPassword,
    signUp,
    cancelReservation,
    signIn,
    reserving,
    stopReserving,
    updateAccount,
    deleteAccount,
  },
  Subscription: {
    onReserving: {
      subscribe: onReserving,
    },
  },
};

export default resolvers;
