import { v4 as uuid } from 'uuid';
import ETokenType from '../../database/enums/ETokenType';
import Token from '../../database/entity/Token';
import User from '../../database/entity/User';
import ForgotPasswordResponse from '../types/reponses/ForgotPasswordResponse';

export interface forgotPasswordInput {
  email: string;
  token?: string;
  newPassword?: string;
}

const createNewToken = async (user: User, ctx) : Promise<ForgotPasswordResponse> => {
  const token = await ctx.db.findOne(Token, { userId: user.id, type: ETokenType.forgotPassword });
  if (token) {
    return {
      success: true, code: '200', message: 'Token.hasBeenFound',
    };
  }
  const t = new Token({ userId: user.id, type: ETokenType.forgotPassword, value: uuid() });
  await ctx.db.save(t);
  await ctx.mailer.forgotPassword(user.email, { fullName: user.fullName, token: t.value });
  return {
    success: true, code: '200', message: 'Token.created',
  };
};

const updatePassword = async (user: User,
  input: { token: string, newPassword: string },
  ctx): Promise<ForgotPasswordResponse> => {
  const token = await ctx.db.findOne(
    Token,
    { userId: user.id, type: ETokenType.forgotPassword, value: input.token },
  );
  if (!token) return { success: false, code: '400', message: 'Token.notFound' };
  // eslint-disable-next-line no-param-reassign
  user.password = input.newPassword;
  await ctx.db.save(user);
  await ctx.db.delete(Token, { id: token.id });
  return { success: true, code: '200', message: 'Password.updated' };
};

const forgotPassword = async (_, args, ctx): Promise<ForgotPasswordResponse> => {
  const { input } = args;
  const { email } = input;

  const user = await ctx.db.findOne(User, { email });
  if (!user) return { success: false, code: '404', message: 'User.notFound' };

  if (input.token && input.newPassword) {
    return updatePassword(user, input, ctx);
  }
  return createNewToken(user, ctx);
};

export default forgotPassword;
