import AlebrijeError from '../../errors/AlebrijeError';
import sqlErrorToMutationResponse from '../../database/sqlErrorToMutationResponse';
import IMutationResponse from '../interfaces/IMutationResponse';
import logger from '../../logger';

export interface UpdateAccountInput {
  password?: string;
}

interface UpdateAccountArgs {
  input: UpdateAccountInput;
}

export default async function (_, args: UpdateAccountArgs, ctx): Promise<IMutationResponse> {
  const { password } = args.input;

  const user = await ctx.getUser(ctx.jwtToken, ctx.db);
  try {
    if (password) {
      user.password = password;
      await ctx.db.save(user);
    }
    return { code: '200', success: true, message: 'User.updated' };
  } catch (e) {
    logger.error(e);
    if (e instanceof AlebrijeError) {
      return { code: e.code, success: false, message: e.message };
    }
    return sqlErrorToMutationResponse(e);
  }
}
