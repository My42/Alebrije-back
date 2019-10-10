const PostgressConnectionStringParser = require('pg-connection-string');

const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);

console.log({ connectionOptions, DATABASE_URL: process.env.DATABASE_URL });

module.exports = [
  {
    type: 'postgres',
    host: process.env.DATABASE_URL || 'localhost',
    port: connectionOptions.port || 5432,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database || 'alebrije',
    synchronize: false,
    extra: { ssl: true },
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
    host: process.env.DATABASE_URL || 'localhost',
    port: connectionOptions.port || 5432,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database || 'alebrije',
    synchronize: false,
    extra: { ssl: true },
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
