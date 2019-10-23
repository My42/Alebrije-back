import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { ApolloServer, PubSub } from 'apollo-server';
import { typeDefs, resolvers } from './imports/graphql';
import getUser from './imports/utils/getUser';
import mailer from './imports/mailer';

createConnection('default').then(async () => {
  const pubSub = new PubSub();
  const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs,
    resolvers,
    subscriptions: {
      onConnect: () => { console.log('user connected to subscriptions'); },
      onDisconnect: (_, ctx) => { console.log('user disconnected to subscriptions'); },
    },

    context: async ({ req, connection }) => {
      let jwtToken = null;
      if (!connection) {
        const { authorization } = req.headers;
        jwtToken = authorization ? authorization.replace('Bearer ', '') : null;
      }

      const db = getManager('default');
      return {
        db,
        jwtToken,
        getUser,
        mailer,
        pubSub,
      };
    },
  });
  const { url, subscriptionsUrl } = await server.listen(process.env.PORT || 4242);
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
}).catch(error => console.log(error));
