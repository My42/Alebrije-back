import NodeCache from 'node-cache';
import User from 'imports/database/entity/User';
import logger from '../logger';

const cache = new NodeCache({ checkperiod: 1 });

export const config = {
  ttl: '300', // 5 minutes
};

export interface cacheValueReservation {
  date: string;
  triggerName: string;
  user: User;
  reservedTableCount: number;
  pubSub: Function;
}

export const setKey = (key: string, value: cacheValueReservation) => (
  cache.set(key, value, config.ttl)
);

cache.on('set', (key, value) => logger.info('[set]', { key, value }));
cache.on('del', async (key, value) => {
  await value.pubSub();
  logger.info('[del]', { key, value });
});
cache.on('expired', (key, value) => logger.info('[expired]', { key, value }));

export default cache;
