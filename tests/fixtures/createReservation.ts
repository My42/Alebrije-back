import Reservation from 'imports/database/entity/Reservation';

const createReservation = (userId: number, args: Object) => new Reservation({
  userId,
  tableNumber: 1,
  date: new Date(),
  ...args,
});

export default createReservation;
