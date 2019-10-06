import jwt from 'jsonwebtoken';
import { EntityManager } from 'typeorm';
import { AuthenticationError } from 'apollo-server';
import User from '../database/entity/User';
import config from '../config/app';

const getUser = async (jwtToken: string, db: EntityManager): Promise<User> => {
  try {
    // @ts-ignore
    const { user } = await jwt.verify(jwtToken, config.jwtSecretKey);
    return db.findOne(User, { id: user.id });
  } catch (e) {
    throw new AuthenticationError('Must authenticate');
  }
};

export default getUser;
