import NodeCache from 'node-cache';
import User from 'imports/database/entity/User';
import { PubSub } from 'apollo-server';
import logger from '../logger';
import Func = Mocha.Func;

const cache = new NodeCache({ checkperiod: 1 });

export const config = {
  ttl: '5', // 5 minutes
};

export interface cacheValueReservation {
  date: string;
  triggerName: string;
  user: User;
  reservedTableCount: number;
  pubSub: Function;
}

export const setKey = (key: string, value: cacheValueReservation) => {
  console.log('ttl = ', config.ttl);
  return cache.set(key, value, '3');
};

cache.on('set', (key, value) => logger.info(`[set]`, { key, value }));
cache.on('del', async (key, value) => {
  console.log('del', -value.reservedTableCount, value.triggerName);
  await value.pubSub();
  //logger.info(`[del]: ${{ key, value }}`)
});
cache.on('expired', (key, value) => logger.info(`[expired]: ${{ key, value }}`));

export default cache;
