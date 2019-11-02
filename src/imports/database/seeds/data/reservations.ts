import eachWeekendOfMonth from 'date-fns/eachWeekendOfMonth';
import Reservation from '../../entity/Reservation';

const weekends = eachWeekendOfMonth(Date.now());
const saturdays = weekends.filter((day, index) => index % 2 === 0);


const reservations = saturdays.map((saturday, index) => (
  new Reservation({
    id: index + 1, date: saturday, userId: 1,
  })
));

export default reservations;
