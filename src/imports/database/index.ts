import {Sequelize} from "sequelize";

const db = new Sequelize("postgresql://localhost/alebrije");

db.authenticate().then(function(err : any) {
    if (err) return console.log(err);
    console.log('Database authenticated');
});

export default db;
