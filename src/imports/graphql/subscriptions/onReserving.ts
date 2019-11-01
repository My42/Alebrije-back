import formatDate from '../../utils/formatDate';
import logger from '../../logger';
import withCancel from '../utils/withCancel';
import cache from '../../cache/reservations';

export interface reservingInput {
  date: string;
}

export const NAME = 'reserving';

export const formatTriggerName = (dateValue: string) => {
  const date = formatDate(dateValue);
  return `${NAME}_${date}`;
};

export default async function onReserving(_, args: reservingInput, ctx) {
  const user = await ctx.getUser(ctx.jwtToken, ctx.db);
  try {
    logger.info(`onReserving ! ${formatTriggerName(args.date)} ${user.id}`);
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
