import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface DrinkRows {
  id?: number,
  label: string,
  price: number,
  isSoft: boolean,
  volume: number
}

@Entity()
class Drink {
  constructor(args?: DrinkRows) {
    if (args) {
      if (args.id) this.id = args.id;
      this.label = args.label;
      this.price = args.price;
      this.isSoft = args.isSoft;
      this.volume = args.volume;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  price!: number;

  @Column()
  volume!: number; // in cl

  @Column()
  label!: string;

  @Column()
  isSoft!: boolean;
}

export default Drink;
