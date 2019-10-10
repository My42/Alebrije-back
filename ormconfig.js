const PostgressConnectionStringParser = require('pg-connection-string');

const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);

console.log({ connectionOptions, DATABASE_URL: process.env.DATABASE_URL });

module.exports = [
  {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    ssl: true,
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
    url: process.env.DATABASE_URL,
    synchronize: false,
    ssl: true,
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
