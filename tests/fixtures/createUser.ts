import faker from 'faker';
import User from '../../src/imports/database/entity/User';

const createUser = (args?: {}): User => new User({
  fullName: faker.name.findName(),
  password: 'coucou0%',
  email: faker.internet.email(),
  ...args,
});

export default createUser;
