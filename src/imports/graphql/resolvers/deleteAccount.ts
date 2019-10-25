import DrinkOrder from '../../database/entity/DrinkOrder';
import Reservation from '../../database/entity/Reservation';
import User from '../../database/entity/User';
import IMutationResponse from '../interfaces/IMutationResponse';
import logger from '../../logger';

export interface deleteAccountResponse extends IMutationResponse { }

export default async function (_, args, ctx): Promise<deleteAccountResponse> {
  const user = await ctx.getUser(ctx.jwtToken, ctx.db);
  try {
    const reservation = await ctx.db.findOne(Reservation, { userId: user.id });
    if (reservation) {
      await ctx.db.delete(DrinkOrder, { revervationId: reservation.id });
      await ctx.db.delete(Reservation, { userId: user.id });
    }
    await ctx.db.delete(User, { id: user.id });
    return { code: '200', success: true, message: 'User.deleted' };
  } catch (e) {
    logger.error(e.toString());
    return { code: '500', success: false, message: 'Error.internalServerError' };
  }
}
