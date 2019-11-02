import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Reservation {
  constructor(args?: { id?: number, date: Date, userId: number, tableCount?: number}) {
    if (args) {
      if (args.id) this.id = args.id;
      this.date = args.date;
      this.userId = args.userId;
      this.tableCount = args.tableCount || 1;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  userId!: number;

  @Column()
  tableCount!: number;
}

export default Reservation;
