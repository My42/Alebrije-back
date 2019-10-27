import {
  createConnection,
  Connection,
} from 'typeorm';

const getDatabaseConnection = (): Promise<Connection> => createConnection('test');

export default getDatabaseConnection;
