import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './imports/graphql';
import getUser from './imports/utils/getUser';

createConnection().then(async () => {
  const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      console.log('1')
      const { authorization } = req.headers;
      const jwtToken = authorization ? authorization.replace('Bearer ', '') : null;
      console.log('2')
      const db = getManager();
      console.log('3')
      return {
        db,
        jwtToken,
      };
    },
  });
  console.log('port:', process.env.PORT || 4000)
  console.log('port heruko:', process.env.PORT)
  const { url } = await server.listen(process.env.PORT || 4000);
  console.log(`🚀  Server ready at ${url}`);
}).catch(error => console.log(error));
