import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../database/entity/User';
import { SignInMutationResponse } from '../interfaces/IMutationResponse';
import config from "../../config/app";

interface signInArgs {
  email: string;
  password: string;
}

const signIn = async (_, args, ctx) : Promise<SignInMutationResponse> => {
  const { email, password } : signInArgs = args.input;
  try {
    const user = await ctx.db.findOne(User, { email });
    console.dir(user, { colors: true });
    if (!user) return { code: '401', success: false, message: 'Invalid email or password' };
    if (!await compare(password, user.password)) return { code: '401', success: false, message: 'Invalid email or password' };
    const token = await sign({ user }, config.jwtSecretKey, { expiresIn: '2 days' });
    return {
      code: '200', success: true, message: 'Authentication succeed', me: user, token,
    };
  } catch (e) {
    return { code: '500', message: 'Interal Server Error', success: false };
  }
};

export default signIn;
