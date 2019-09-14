import signUp from './signUp';

const resolvers = {
  Query: {
    me: () => 'me',
  },
  Mutation: {
    signUp,
    signIn: () => ({ code: '200', success: true, message: 'msg' }),
  },
};

export default resolvers;
