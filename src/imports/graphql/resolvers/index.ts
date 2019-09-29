import signUp from './signUp';
import signIn from './signIn';
import forgotPassword from './forgotPassword';
import reservations from './reservations';

const resolvers = {
  Query: {
    me: () => 'me',
    signIn,
    reservations,
  },
  Mutation: {
    signUp,
    forgotPassword,
  },
};

export default resolvers;
