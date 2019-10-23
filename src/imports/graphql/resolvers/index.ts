import signUp from './signUp';
import signIn from './signIn';
import forgotPassword from './forgotPassword';
import reservations from './reservations';
import addReservation from './addReservation';
import cancelReservation from './cancelReservation';
import reserving from './reserving';
import { onReserving } from '../subscriptions';

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
  },
  Subscription: {
    onReserving: {
      subscribe: onReserving,
    },
  },
};

export default resolvers;
