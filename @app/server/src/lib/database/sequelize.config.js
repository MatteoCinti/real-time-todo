require('ts-node/register');
require('dotenv').config();

// module.exports = {
//   development: {
//     username: 'ubqt_dev',
//     password: 'ubqt_dev_pass',
//     database: 'ubqt_dev',
//     host: '127.0.0.1',
//     dialect: 'postgres'
//   },
//   test: {
//     username: 'root',
//     password: null,
//     database: 'database_test',
//     host: '127.0.0.1',
//     dialect: 'mysql'
//   },
//   production: {
//     username: 'root',
//     password: null,
//     database: 'database_production',
//     host: '127.0.0.1',
//     dialect: 'mysql'
//   }
// };

module.exports = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'railway',
  port: 28824,
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres'
};
