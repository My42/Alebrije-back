import { getConnection } from 'typeorm';
import User from '../../database/entity/User';
import IMutationResponse from '../interfaces/IMutationResponse';
import sqlErrorToMutationResponse from '../../database/sqlErrorToMutationResponse';

interface signUpArgs {
  fullName: string;
  email: string;
  password: string;
}

const signUp = async (_, args) : Promise<IMutationResponse> => {
  const { fullName, email, password } : signUpArgs = args.input;

  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { fullName, email, password },
      ])
      .execute();
    return ({ code: '200', success: true, message: 'Sign up Succeed' });
  } catch (e) {
    return sqlErrorToMutationResponse(e);
  }
};

export default signUp;
