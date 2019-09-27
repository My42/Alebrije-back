import signUp from './signUp';
import signIn from './signIn';
import forgotPassword from "./forgotPassword";

const resolvers = {
  Query: {
    me: () => 'me',
    signIn,
  },
  Mutation: {
    signUp,
    forgotPassword,
  },
};

export default resolvers;
