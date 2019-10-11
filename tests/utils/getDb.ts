import { EntityManager, getManager } from "typeorm";

const getDb = (): EntityManager => getManager('test');

export default getDb;
