import Reservation from '../../database/entity/Reservation';
import IMutationResponse from '../interfaces/IMutationResponse';
import getUser from '../../utils/getUser';

export interface Input {
  input: {
    id: number;
  }
}

const cancelReservation = async (_, args: Input, ctx): Promise<IMutationResponse> => {
  const { input } = args;
  const user = await getUser(ctx.jwtToken, ctx.db);
  const reservation = await ctx.db.findOne(Reservation, { id: input.id });
  if (!reservation) return { code: '404', success: false, message: 'Reservation not found' };
  if (reservation.userId !== user.id) return { code: '403', success: false, message: 'Forbidden' };
  try {
    await ctx.db.delete(Reservation, input.id);
    return { code: '200', success: true, message: 'Reservation canceled' };
  } catch (e) {
    return { code: '500', success: false, message: 'Internal Server error' };
  }
};

export default cancelReservation;
