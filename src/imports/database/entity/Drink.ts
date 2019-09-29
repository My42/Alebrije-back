import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Drink {
  constructor(args?: { label: string, price: number, isSoft: boolean }) {
    if (args) {
      this.label = args.label;
      this.price = args.price;
      this.isSoft = args.isSoft;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  price!: number;

  @Column()
  label!: string;

  @Column()
  isSoft!: boolean;
}

export default Drink;
