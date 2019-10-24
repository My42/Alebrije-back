import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import logger from '../../logger';
import withCancel from '../utils/withCancel';
import cache, { cacheValueReservation } from '../../cache/reservations';

export interface reservingInput {
  date: string;
}

export const NAME = 'reserving';

export const formatTriggerName = (dateValue: string) => {
  const date = formatDate(
    parseDate(dateValue, 'MM/dd/yyyy', new Date()),
    'yyyy-MM-dd',
  );
  return `${NAME}_${date}`;
};

export default async function onReserving(_, args: reservingInput, ctx) {
  const user = await ctx.getUser(ctx.jwtToken, ctx.db);
  try {
    console.log('onReserving !', formatTriggerName(args.date), user);
    return withCancel(
      ctx.pubSub.asyncIterator(formatTriggerName(args.date)),
      () => {
        logger.info(`User[${user.id}] unsubscribed onReserving`);
        const key = `${formatTriggerName(args.date)}-${user.id}`;
        cache.del(key);
      },
    );
  } catch (e) {
    logger.error('Subscriptions - onReserving - ', e);
  }
  return null;
}
