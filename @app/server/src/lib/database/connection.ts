import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.POSTGRESDB_URL!);

export default db;
