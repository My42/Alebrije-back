import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { hash } from 'bcryptjs';
import AlebrijeError from '../../errors/AlebrijeError';

@Entity()
class User {
  constructor(args? : {
    fullName: string,
    password: string,
    email: string,
    id?: number,
  }) {
    if (args) {
      if (args.id) this.id = args.id;
      this.fullName = args.fullName;
      this.password = args.password;
      this.email = args.email;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  @Length(8)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @BeforeInsert()
  async checkFullName() {
    if (this.fullName.length === 0) {
      throw new AlebrijeError('400', 'Invalid full name');
    }
  }

  @BeforeInsert()
  async checkPassword() {
    if (!this.password.match(/(?=.*[0-9])(?=.*[!-\/])(?=.{8,})/)) {
      throw new AlebrijeError('400', 'Invalid password');
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, parseInt(process.env.BCRYPT_SALT, 10) || 8);
  }
}

export default User;
