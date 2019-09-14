import { getConnection } from 'typeorm';
import User from '../../database/entity/User';

interface signUpArgs {
  fullName: string;
  email: string;
  password: string;
}

const signUp = async (_, args) => {
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
    return ({ code: '409', success: false, message: 'Email already used' });
  }
};

export default signUp;
