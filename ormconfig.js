module.exports = [
  {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    ssl: !!process.env.DATABASE_URL,
    logging: false,
    migrationsTableName: 'migrations',
    entities: [
      [__dirname + '/../**/*.entity.{js,ts}'],
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
    url: process.env.DATABASE_URL,
    synchronize: false,
    ssl: !!process.env.DATABASE_URL,
    logging: false,
    migrationsTableName: 'seeds',
    entities: [
      [__dirname + '/../**/*.entity.{js,ts}'],
    ],
    migrations: [
      'src/imports/database/seeds/*.ts',
    ],
    cli: {
      migrationsDir: 'src/imports/database/seeds',
    },
  },
];
