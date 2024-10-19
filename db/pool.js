const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DATABASE}`;
console.log(process.env.DATABASE_URL);
module.exports = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: false,
});

/* LOCAL IMPLENTATION
module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
*/
