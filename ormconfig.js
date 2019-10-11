const databaseInfo = process.env.DATABASE_URL
  ? { url: process.env.DATABASE_URL }
  : {
    port: 5432,
    database: 'alebrije',
  };
const testDatabaseInfo = process.env.TEST_DATABASE_URL
  ? { url: process.env.DATABASE_URL }
  : {
    port: 5432,
    database: 'test_alebrije',
  };
const ssl = process.env.NODE_ENV === 'production';

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    ...databaseInfo,
    synchronize: false,
    ssl,
    logging: false,
    migrationsTableName: 'migrations',
    entities: [
        'src/imports/database/entity/**/*.ts',
    ],
    migrations: [
      'src/imports/database/migration/**/*.ts',
    ],
    cli: {
      entitiesDir: 'src/imports/database/entity',
      migrationsDir: 'src/imports/database/migration',
      subscribersDir: 'src/imports/database/subscriber',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    ...databaseInfo,
    synchronize: false,
    ssl,
    logging: false,
    migrationsTableName: 'seeds',
    entities: [
      'src/imports/database/entity/**/*.ts',
    ],
    migrations: [
      'src/imports/database/seeds/*.ts',
    ],
    cli: {
      entitiesDir: 'src/imports/database/entity',
      migrationsDir: 'src/imports/database/seeds',
      subscribersDir: 'src/imports/database/subscriber',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    ...testDatabaseInfo,
    synchronize: false,
    ssl,
    logging: false,
    migrationsTableName: 'migrations',
    entities: [
      'src/imports/database/entity/**/*.ts',
    ],
    migrations: [
      'src/imports/database/migration/**/*.ts',
    ],
    cli: {
      entitiesDir: 'src/imports/database/entity',
      migrationsDir: 'src/imports/database/migration',
      subscribersDir: 'src/imports/database/subscriber',
    },
  },
];
