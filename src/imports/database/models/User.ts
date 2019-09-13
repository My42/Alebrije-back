import { Model } from 'sequelize';

class User extends Model {
  public id!: number;

  public fullName!: string;

  public email!: string;

  public password!: string;
}

export default User;
