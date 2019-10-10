import User from '../../database/entity/User';
import IMutationResponse from '../interfaces/IMutationResponse';
import sqlErrorToMutationResponse from '../../database/sqlErrorToMutationResponse';

interface signUpArgs {
  fullName: string;
  email: string;
  password: string;
}

const signUp = async (_, args, ctx) : Promise<IMutationResponse> => {
  console.log('4')
  const { fullName, email, password } : signUpArgs = args.input;
  try {
    const user = new User({ email, fullName, password });
    console.log('5')
    await ctx.db.save(user);
    console.log('6')
    return ({ code: '200', success: true, message: 'Sign up Succeed' });
  } catch (e) {
    return sqlErrorToMutationResponse(e);
  }
};

export default signUp;
