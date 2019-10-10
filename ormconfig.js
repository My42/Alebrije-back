const testFolder = './tests/';
const fs = require('fs');
__dirname + '/src/imports/database/entity/**/*.{js,ts}',
__dirname + '/imports/database/entity/'

fs.readdir(__dirname
  , (err, files) => {
    console.log("1____________________________")
    if (err) return console.log(err)
    files.forEach(file => {
      console.log(file);
    });
    console.log("1____________________________")
  });
fs.readdir(__dirname + '/imports/database/entity/'
  , (err, files) => {
    console.log("2____________________________")
    if (err) return console.log(err)
    files.forEach(file => {
      console.log(file);
    });
    console.log("2____________________________")
  });
fs.readdir(__dirname + '/build/imports/database/entity/'
  , (err, files) => {
    console.log("3____________________________")
    if (err) return console.log(err)
    files.forEach(file => {
      console.log(file);
    });
    console.log("3____________________________")
  });

console.log('dirname/', __dirname)
module.exports = [
  {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    ssl: !!process.env.DATABASE_URL,
    logging: false,
    migrationsTableName: 'migrations',
    entities: [
      [
        __dirname + '/src/imports/database/entity/**/*.{js,ts}',
        __dirname + '/build/imports/database/entity/**/*.{js,ts}'
      ]
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
