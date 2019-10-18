import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './imports/graphql';
import getUser from './imports/utils/getUser';

createConnection('default').then(async () => {
  const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const { authorization } = req.headers;
      const jwtToken = authorization ? authorization.replace('Bearer ', '') : null;
      const db = getManager('default');
      return {
        db,
        jwtToken,
        getUser,
      };
    },
  });
  const { url } = await server.listen(process.env.PORT || 4242);
  console.log(`🚀  Server ready at ${url}`);
}).catch(error => console.log(error));
