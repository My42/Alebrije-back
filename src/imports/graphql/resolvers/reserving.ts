import IMutationResponse from '../interfaces/IMutationResponse';
import { formatTriggerName } from '../subscriptions/onReserving';
import { cacheValueReservation, setKey } from '../../cache/reservations';

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
  const triggerName = formatTriggerName(date);
  const onUnsubscribe = () => ctx.pubSub.publish(triggerName, { onReserving: { reservedTableCount: -reservedTableCount } });
  console.log('send to ->', triggerName, { reservedTableCount });
  // Todo: check date & reservervedTableCount

  await ctx.pubSub.publish(triggerName, { onReserving: { reservedTableCount } });
  setKey(`${triggerName}-${user.id}`, {
    date, reservedTableCount, user, pubSub: onUnsubscribe, triggerName,
  });
  return { code: '200', success: true, message: 'All client have been notified' };
};

export default resolver;
