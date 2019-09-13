import { Sequelize } from 'sequelize';

const db = new Sequelize('postgresql://localhost/alebrije');

db.authenticate().then((err : any) => {
  if (err) console.log(err);
  else console.log('Database authenticated');
});

export default db;
