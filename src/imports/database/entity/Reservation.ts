import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Reservation {
  constructor(args?: { date: number, tableNumber: number }) {
    if (args) {
      this.date = args.date;
      this.tableNumber = args.tableNumber;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: number;

  @Column()
  tableNumber!: number;
}

export default Reservation;
