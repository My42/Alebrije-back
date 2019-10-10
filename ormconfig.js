const databaseInfo = process.env.DATABASE_URL
  ? { url: process.env.DATABASE_URL }
  : {
    port: 5432,
    database: 'alebrije',
  };
const ssl = process.env.NODE_ENV === 'production';

module.exports = [
  {
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
      migrationsDir: 'src/imports/database/seeds',
    },
  },
];
