import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './imports/graphql';

createConnection().then(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      db: getManager(),
    }),
  });
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
}).catch(error => console.log(error));
