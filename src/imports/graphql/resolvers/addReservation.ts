import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import compareAsc from 'date-fns/compareAsc';
import IMutationResponse from '../interfaces/IMutationResponse';
import DrinkOrderEntity from '../../database/entity/DrinkOrder';
import Reservation from '../../database/entity/Reservation';
import checkTableNumber from '../../utils/checkTableNumber';

export interface DrinkOrder {
  drinkId: number;
  quantity: number;
}

export interface AddReservationInput {
  date: string;
  tableNumber: number;
  drinkOrders?: [DrinkOrder]
}

const addReservation = async (_, args, ctx): Promise<IMutationResponse> => {
  const { input } : { input: AddReservationInput } = args;
  const user = await ctx.getUser(ctx.jwtToken, ctx.db);
  let date = null;
  try {
    date = formatDate(
      parseDate(input.date, 'MM/dd/yyyy', new Date()),
      'yyyy-MM-dd',
    );
    if (new Date(date) <= new Date()) throw new Error('Invalid date value');
  } catch (e) {
    return { code: '400', success: false, message: 'Invalid date value' };
  }

  if (!checkTableNumber(input.tableNumber)) return { code: '400', success: false, message: 'Invalid table number' };

  const reservation = new Reservation({ date, tableNumber: input.tableNumber, userId: user.id });
  try {
    await ctx.db.save(reservation);
  } catch (e) {
    return { code: '403', success: false, message: 'Table already taken' };
  }

  if (input.drinkOrders) {
    const drinkOrders: DrinkOrderEntity[] = input.drinkOrders.reduce(
      (result, order) => {
        const { drinkId, quantity } = order;
        const drinks = new Array(quantity)
          .fill(new DrinkOrderEntity({ drinkId, reservationId: reservation.id }));
        return [...result, ...drinks];
      },
      [],
    );

    try {
      await ctx.db.save(drinkOrders);
    } catch (e) {
      await ctx.db.delete(Reservation, reservation.id);
      return { code: '400', success: false, message: 'Invalid drink id' };
    }
  }
  return { code: '200', success: true, message: 'Reservation added' };
};

export default addReservation;
