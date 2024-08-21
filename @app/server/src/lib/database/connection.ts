import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.POSTGRESDB_URL!, {
  dialect: 'postgres'
});

export default db;
