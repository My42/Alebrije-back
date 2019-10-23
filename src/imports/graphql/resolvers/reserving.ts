import IMutationResponse from '../interfaces/IMutationResponse';
import { formatTriggerName } from '../subscriptions/onReserving';

export interface ReservingInput {
  date: string;
  reservedTableCount: number;
}

interface Args {
  input: ReservingInput;
}

const resolver = async (_, args: Args, ctx): Promise<IMutationResponse> => {
  const { date, reservedTableCount } = args.input;
  console.log('send to ->', formatTriggerName(date), { reservedTableCount });
  await ctx.pubSub.publish(formatTriggerName(date), { onReserving: { reservedTableCount } });
  return { code: '200', success: true, message: 'All client have been notified' };
};

export default resolver;
