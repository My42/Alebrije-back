import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Reservation {
  constructor(args?: { date: Date, tableNumber: number }) {
    if (args) {
      this.date = args.date;
      this.tableNumber = args.tableNumber;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  tableNumber!: number;
}

export default Reservation;
