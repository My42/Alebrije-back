import IMutationResponse from '../interfaces/IMutationResponse';
import { formatTriggerName } from '../subscriptions/onReserving';
import { setKey } from '../../cache/reservations';
import info from '../../constants/alebrijeInfo';

export interface ReservingInput {
  date: string;
  reservedTableCount: number;
}

interface Args {
  input: ReservingInput;
}

const resolver = async (_, args: Args, ctx): Promise<IMutationResponse> => {
  const user = await ctx.getUser(ctx.jwtToken, ctx.db);
  const { date, reservedTableCount } = args.input;

  if (reservedTableCount <= 0 || reservedTableCount > info.numberOfTables) return { code: '400', success: false, message: 'Error.invalid.reservedTableCount' };

  try {
    const triggerName = formatTriggerName(date);
    const onUnsubscribe = () => (
      ctx.pubSub.publish(triggerName, { onReserving: { reservedTableCount: -reservedTableCount } })
    );

    await ctx.pubSub.publish(triggerName, { onReserving: { reservedTableCount } });
    setKey(`${triggerName}-${user.id}`, {
      date, reservedTableCount, user, pubSub: onUnsubscribe, triggerName,
    });
  } catch (e) {
    return { code: '400', success: false, message: 'Error.invalid.email' };
  }
  return { code: '200', success: true, message: 'Users.notified' };
};

export default resolver;
