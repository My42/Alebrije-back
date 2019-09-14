const resolvers = {
  Query: {
    me: () => 'me',
  },
  Mutation: {
    signUp: () => ({ code: '200', success: true, message: 'msg' }),
    signIn: () => ({ code: '200', success: true, message: 'msg' }),
  },
};

export default resolvers;
