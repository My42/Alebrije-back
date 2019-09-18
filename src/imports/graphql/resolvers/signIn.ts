import { getConnection } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../../database/entity/User';
import { SignInMutationResponse } from '../interfaces/IMutationResponse';

interface signInArgs {
  email: string;
  password: string;
}

const signIn = async (_, args) : Promise<SignInMutationResponse> => {
  const { email, password } : signInArgs = args;
  try {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email and user.password = :password', { email, password })
      .getOne();
    const token = await sign({ me: user }, 'secretKey', { expiresIn: '2 days' });
    return {
      code: '200', success: true, message: 'Authentication succeed', me: user, token,
    };
  } catch (e) {
    return { code: '401', success: false, message: 'Invalid email or password' };
  }
};

export default signIn;
