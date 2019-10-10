module.exports = [
  {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'alebrije',
    synchronize: false,
    logging: false,
    migrationsTableName: 'migrations',
    entities: [
      'src/imports/database/entity/**/*.ts',
    ],
    migrations: [
      'src/imports/database/migration/**/*.ts',
    ],
    subscribers: [
      'src/imports/database/subscriber/**/*.ts',
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
    host: 'localhost',
    port: 5432,
    database: 'alebrije',
    synchronize: false,
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
