import map from 'aigle/map';
import format from 'date-fns/format';
import getTime from 'date-fns/getTime';
import Reservation from '../../database/entity/Reservation';
import Drink from '../../database/entity/Drink';

const resolver = async (_, args, ctx): Promise<Reservation> => {
  console.log('--->', _);
  const { month, year } = args.input;
  const from = format(new Date(year, month, 1), 'yyyy-MM-dd');
  const to = format(new Date(year, month + 1, 1), 'yyyy-MM-dd');
  const drinks = await ctx.db.find(Drink);

  const reservations = await ctx.db.createQueryBuilder()
    .select('reservation')
    .from(Reservation, 'reservation')
    .where('reservation.date >= :from AND reservation.date < :to',
      { from, to })
    .getMany();

  const drinkOrders = await map(reservations, async reservation => (
    ctx.db.query(`SELECT "drinkId", count("do"."id") FROM "drinkOrder" "do" WHERE "do"."reservationId" = ${reservation.id} GROUP BY "do"."drinkId"`)
  ));

  console.dir(drinkOrders, { colors: true })

  const ret = await map(reservations, async (reservation, index) => {
    const orders = await map(drinkOrders[index], (order) => {
      const { drinkId, count } = order;
      const drink = drinks.find(({ id }) => id === drinkId);
      return { drink, quantity: count };
    });

    console.dir(orders, { colors: true, depth: null });

    return {
      ...reservation,
      date: getTime(reservation.date),
      drinkOrders: orders,
    };
  });
  console.dir(ret, { colors: true, depth: null });
  return ret;
};

export default resolver;
