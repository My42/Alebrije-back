import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Alcohol {
  constructor(args?: { label: string, price: number }) {
    if (args) {
      this.label = args.label;
      this.price = args.price;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  price!: number;

  @Column()
  label!: string;
}

export default Alcohol;
