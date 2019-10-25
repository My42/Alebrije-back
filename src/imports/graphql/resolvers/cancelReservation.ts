import Reservation from '../../database/entity/Reservation';
import IMutationResponse from '../interfaces/IMutationResponse';

export interface Input {
  id: number;
}

const cancelReservation = async (_, args: { input: Input }, ctx): Promise<IMutationResponse> => {
  const { input } = args;
  const user = await ctx.getUser(ctx.jwtToken, ctx.db);
  const reservation = await ctx.db.findOne(Reservation, { id: input.id });
  if (!reservation) return { code: '404', success: false, message: 'Reservation.notFound' };
  if (reservation.userId !== user.id) return { code: '403', success: false, message: 'Error.forbidden' };
  try {
    await ctx.db.delete(Reservation, input.id);
    return { code: '200', success: true, message: 'Reservation.canceled' };
  } catch (e) {
    return { code: '500', success: false, message: 'Server.IntervalServerError' };
  }
};

export default cancelReservation;
