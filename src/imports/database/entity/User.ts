import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {IsEmail, Length} from 'class-validator';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  @Length(8)
  password: string;

  @Column()
  @IsEmail()
  email: number;
}

export default User;
