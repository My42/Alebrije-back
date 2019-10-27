import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import ETokenType from '../enums/ETokenType';

@Entity()
class Token {
  constructor(args?: { userId: number, type: ETokenType, value: string }) {
    if (args) {
      this.userId = args.userId;
      this.type = args.type;
      this.value = args.value;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  type!: string;

  @Column()
  value!: string;
}

export default Token;
