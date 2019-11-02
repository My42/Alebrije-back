import IMutationResponse from '../interfaces/IMutationResponse';
import DrinkOrderEntity from '../../database/entity/DrinkOrder';
import Reservation from '../../database/entity/Reservation';
import formatDate from '../../utils/formatDate';

export interface DrinkOrder {
  drinkId: number;
  quantity: number;
}

export interface AddReservationInput {
  date: string;
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
    return { code: '400', success: false, message: 'Error.invalid.date' };
  }

  const reservation = new Reservation({ date, userId: user.id });
  await ctx.db.save(reservation);

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
      return { code: '400', success: false, message: 'Error.invalid.drink' };
    }
  }
  return { code: '200', success: true, message: 'Reservation.added' };
};

export default addReservation;
