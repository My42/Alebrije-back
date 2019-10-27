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
  const triggerName = formatTriggerName(date);

  await ctx.pubSub.publish(triggerName,
    { onReserving: { reservedTableCount: -reservedTableCount } });
  return { code: '200', success: true, message: 'All client have been notified' };
};

export default resolver;
