import IMutationResponse from '../interfaces/IMutationResponse';
import DrinkOrderEntity from '../../database/entity/DrinkOrder';
import Reservation from '../../database/entity/Reservation';
import checkTableNumber from '../../utils/checkTableNumber';
import formatDate from '../../utils/formatDate';

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
    date = formatDate(input.date);
    if (new Date(date) <= new Date()) throw new Error('Error.invalid.date');
  } catch (e) {
    return { code: '400', success: false, message: 'Invalid.date' };
  }

  if (!checkTableNumber(input.tableNumber)) return { code: '400', success: false, message: 'Invalid.tableNumber' };

  const reservation = new Reservation({ date, tableNumber: input.tableNumber, userId: user.id });
  try {
    await ctx.db.save(reservation);
  } catch (e) {
    return { code: '403', success: false, message: 'Table.alreadyTaken' };
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
      return { code: '400', success: false, message: 'Invalid.drink' };
    }
  }
  return { code: '200', success: true, message: 'Reservation.added' };
};

export default addReservation;
