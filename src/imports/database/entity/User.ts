import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { hash } from 'bcryptjs';

@Entity()
class User {
  constructor(args? : {
    fullName: string,
    password: string,
    email: string,
  }) {
    if (args) {
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
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, parseInt(process.env.BCRYPT_SALT, 10) || 8);
  }
}

export default User;
