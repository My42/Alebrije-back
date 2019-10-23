import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import logger from '../../logger';
import withCancel from '../utils/withCancel';

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
  try {
    console.log('onReserving !', formatTriggerName(args.date));
    return withCancel(
      ctx.pubSub.asyncIterator(formatTriggerName(args.date)),
      () => {
        console.log('user unsubscribe');
        ctx.pubSub.publish(formatTriggerName(args.date), { onReserving: { reservedTableCount: -2 } });
      },
    );
  } catch (e) {
    logger.error('Subscriptions - onReserving - ', e);
  }
  return null;
}
