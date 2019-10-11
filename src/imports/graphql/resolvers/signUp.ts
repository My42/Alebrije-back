import User from '../../database/entity/User';
import IMutationResponse from '../interfaces/IMutationResponse';
import sqlErrorToMutationResponse from '../../database/sqlErrorToMutationResponse';

interface signUpArgs {
  fullName: string;
  email: string;
  password: string;
}

const signUp = async (_, args: { input: signUpArgs }, ctx) : Promise<IMutationResponse> => {
  const { fullName, email, password } : signUpArgs = args.input;
  try {
    const user = new User({ email, fullName, password });
    await ctx.db.save(user);
    return ({ code: '200', success: true, message: 'Sign up Succeed' });
  } catch (e) {
    return sqlErrorToMutationResponse(e);
  }
};

export default signUp;
