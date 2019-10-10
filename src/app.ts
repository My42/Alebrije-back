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
  console.log('port:', process.env.PORT || 4000)
  console.log('port heruko:', process.env.PORT)
  const { url } = await server.listen(process.env.PORT || 4000);
  console.log(`🚀  Server ready at ${url}`);
}).catch(error => console.log(error));
