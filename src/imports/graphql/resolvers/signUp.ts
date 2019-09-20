import { hash } from 'bcryptjs';
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
        {
          fullName,
          email,
          password: await hash(password, parseInt(process.env.BCRYPT_SALT, 10) || 8),
        },
      ])
      .execute();
    return ({ code: '200', success: true, message: 'Sign up Succeed' });
  } catch (e) {
    return sqlErrorToMutationResponse(e);
  }
};

export default signUp;
