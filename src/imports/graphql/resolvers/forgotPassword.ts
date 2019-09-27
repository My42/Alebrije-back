import { v4 as uuid } from 'uuid';
import Token from '../../database/entity/Token';
import User from '../../database/entity/User';
import ETokenType from '../../database/enums/ETokenType';
import ForgotPasswordResponse from '../types/reponses/ForgotPasswordResponse';

const createNewToken = async (user: User, db) : Promise<ForgotPasswordResponse> => {
  const token = await db.select('token').from(Token, 'token').getOne();
  if (token) return { success: true, code: '200', message: 'Token has been found', token: token.value };
  const tokenValue = uuid();
  await db.insert().into(Token)
    .values([
      { userId: user.id, type: ETokenType.forgotPassword, value: tokenValue },
    ]).execute();
  return {
    success: true, code: '200', message: 'Token created', token: tokenValue,
  };
};

const updatePassword = async (user: User,
  input: { token: string, newPassword: string },
  db): Promise<ForgotPasswordResponse> => {
  const token = await db.select('token').from(Token, 'token')
    .where('token.userId = :userId', { userId: user.id })
    .andWhere('token.type = :type', { type: ETokenType.forgotPassword })
    .andWhere('token.value = :value', { value: input.token })
    .getOne();
  if (!token) return { success: false, code: '400', message: 'Token not found' };
  await db.update(User).set({ password: input.newPassword }).where({ id: user.id }).execute();
  await db.delete().from(Token, 'token').where('token.id = :id', { id: token.id }).execute();
  return { success: true, code: '200', message: 'Password updated' };
};

const forgotPassword = async (_, args, ctx): Promise<ForgotPasswordResponse> => {
  const { input } = args;
  const { email } = input;

  const user = await ctx.db.select('user.id')
    .from(User)
    .where('user.email = :email', { email })
    .getOne();
  if (!user) return { success: false, code: '400', message: 'User not found' };

  if (input.token && input.newPassword) {
    return updatePassword(user, input, ctx.db);
  }
  return createNewToken(user, ctx.db);
};

export default forgotPassword;
