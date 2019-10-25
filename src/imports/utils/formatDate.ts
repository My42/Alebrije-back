import parseDate from 'date-fns/parse';
import formatDate from 'date-fns/format';

export default function (date: string) {
  return formatDate(
    parseDate(date, 'MM/dd/yyyy', new Date()),
    'yyyy-MM-dd',
  );
}
