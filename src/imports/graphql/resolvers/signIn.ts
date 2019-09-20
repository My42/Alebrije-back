import { compare } from 'bcryptjs';
import { getConnection } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../../database/entity/User';
import { SignInMutationResponse } from '../interfaces/IMutationResponse';

interface signInArgs {
  email: string;
  password: string;
}

const signIn = async (_, args) : Promise<SignInMutationResponse> => {
  const { email, password } : signInArgs = args.input;
  try {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (!user) return { code: '401', success: false, message: 'Invalid email or password' };
    if (!await compare(password, user.password)) return { code: '401', success: false, message: 'Invalid email or password' };
    const token = await sign({ me: user }, 'secretKey', { expiresIn: '2 days' });
    return {
      code: '200', success: true, message: 'Authentication succeed', me: user, token,
    };
  } catch (e) {
    return { code: '500', message: 'Interal Server Error', success: false };
  }
};

export default signIn;
