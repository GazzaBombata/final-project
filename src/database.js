import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';


if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

let dbConfig = {
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
console.log(`Using first host ${host}`);
if (process.env.NODE_ENV === 'production') {
  dbConfig.dialectOptions = {
    socketPath: '/cloudsql/' + process.env.CLOUD_SQL_CONNECTION_NAME
  };
} else {
  dbConfig.host = process.env.DB_HOST;
  dbConfig.port = process.env.DB_PORT;
}

export const sequelize = new Sequelize(dbConfig);
