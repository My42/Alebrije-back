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

const resolvers = {
  Query: {
    me: (_, args, ctx) => ctx.pubSub.publish('reserving_2020-01-12', { }),
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
  },
  Subscription: {
    onReserving: {
      subscribe: onReserving,
    },
  },
};

export default resolvers;
