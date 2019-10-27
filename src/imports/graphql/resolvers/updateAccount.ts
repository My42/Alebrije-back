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
    return { code: '500', success: false, message: 'Error.internalServerError' };
  }
}
