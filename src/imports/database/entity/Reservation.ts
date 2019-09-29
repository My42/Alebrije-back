import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Reservation {
  constructor(args?: { id?: number, date: Date, tableNumber: number }) {
    if (args) {
      if (args.id) this.id = args.id;
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
