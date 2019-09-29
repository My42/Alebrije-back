import DrinkOrder from '../../entity/DrinkOrder';
import reservations from './reservations';
import drink from './drinks';

const drinkOrders = reservations.map(reservation => (
  new DrinkOrder({ reservationId: reservation.id, drinkId: drink[1].id })
));

export default drinkOrders;
