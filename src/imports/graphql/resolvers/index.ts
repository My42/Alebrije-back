import signUp from './signUp';
import signIn from './signIn';

const resolvers = {
  Query: {
    me: () => 'me',
  },
  Mutation: {
    signUp,
    signIn,
  },
};

export default resolvers;
