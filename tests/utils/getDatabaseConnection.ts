import { createConnection, Connection, getConnection, getManager} from 'typeorm';

const getDatabaseConnection = (): Promise<Connection> => createConnection('test');

export default getDatabaseConnection;
