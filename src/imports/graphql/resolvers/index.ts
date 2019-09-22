import signUp from './signUp';
import signIn from './signIn';

const resolvers = {
  Query: {
    me: () => 'me',
    signIn,
  },
  Mutation: {
    signUp,
  },
};

export default resolvers;
