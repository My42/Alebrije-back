import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Reservation {
  constructor(args?: { id?: number, date: Date, userId: number }) {
    if (args) {
      if (args.id) this.id = args.id;
      this.date = args.date;
      this.userId = args.userId;
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  userId!: number;
}

export default Reservation;
