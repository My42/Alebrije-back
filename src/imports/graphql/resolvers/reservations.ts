import format from 'date-fns/format';
import getTime from 'date-fns/getTime';
import Reservation from '../../database/entity/Reservation';

const resolver = async (_, args, ctx): Promise<Reservation> => {
  const { month, year } = args.input;
  const from = format(new Date(year, month, 1), 'yyyy-MM-dd');
  const to = format(new Date(year, month + 1, 1), 'yyyy-MM-dd');

  const reservations = await ctx.db.createQueryBuilder()
    .select('reservation')
    .from(Reservation, 'reservation')
    .where('reservation.date >= :from AND reservation.date < :to',
      { from, to })
    .getMany();
  return reservations.map(reservation => (
    { ...reservation, date: getTime(reservation.date) }
  ));
};

export default resolver;
