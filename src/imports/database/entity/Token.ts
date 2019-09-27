import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import ETokenType from '../enums/ETokenType';

@Entity()
class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  type: ETokenType;

  @Column()
  value: string;
}

export default Token;
