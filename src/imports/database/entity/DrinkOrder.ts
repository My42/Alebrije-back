import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('drinkOrder')
class DrinkOrder {
  constructor(args?: { reservationId: number, drinkId: number }) {
    if (args) {
      this.reservationId = args.reservationId;
      this.drinkId = args.drinkId;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  reservationId!: number;

  @Column()
  drinkId!: number;
}

export default DrinkOrder;
