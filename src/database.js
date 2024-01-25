import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}

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

// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';

// dotenv.config();

// let dbConfigTest = {
//   dialect: 'mysql',
//   username: process.env.TEST_DB_USER,
//   password: process.env.TEST_DB_PASSWORD,
//   database: process.env.TEST_DB_NAME,
//   host: process.env.TEST_DB_HOST,
//   port: process.env.TEST_DB_PORT
// };

// let dbConfigProd = {
//   dialect: 'mysql',
//   username: process.env.PROD_DB_USER,
//   password: process.env.PROD_DB_PASSWORD,
//   database: process.env.PROD_DB_NAME,
//   host: process.env.PROD_DB_HOST,
//   port: process.env.PROD_DB_PORT
// };

// const sequelizeTest = new Sequelize(dbConfigTest);
// const sequelizeProd = new Sequelize(dbConfigProd);

// export { sequelizeTest, sequelizeProd };