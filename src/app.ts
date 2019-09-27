import 'reflect-metadata';
import { createConnection, getRepository, getConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './imports/graphql';
import User from './imports/database/entity/User';


createConnection().then(async connection => {
  /*console.log('Inserting a new user into the database...');
  const user = new User();
  user.email = 'vincent.mesquita@epitec.eu';
  user.fullName = 'Timber';
  user.password = 'lol';
  console.log(user);
  await connection.manager.save(user);
  console.log(`Saved a new user with id: ${user.id}`);*/

  console.log('Loading users from the database...');
  const users = await connection.manager.find(User);
  console.log('Loaded users: ', users);

  const userRepository = getRepository(User); // or connection.getMongoManager
  const timber = await userRepository.findOne({ fullName: 'Timber' });
  console.log('timber:', timber);

  const userr = await getConnection()
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .getOne();

  console.log('?? ', userr);

  console.log('Here you can setup and run express/koa/any other framework.');
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      db: getConnection().createQueryBuilder(),
    }),
  });
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
}).catch(error => console.log(error));
