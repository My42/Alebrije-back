import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './imports/graphql';
import getUser from './imports/utils/getUser';


createConnection().then(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const jwtToken = req.headers.authorization.replace('Bearer ', '');

      return {
        db: getManager(),
        jwtToken,
      };
    },
  });
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
}).catch(error => console.log(error));
