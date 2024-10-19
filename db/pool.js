const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DATABASE}`;

console.log("Environment:", process.env.NODE_ENV);
console.log("Is Production:", isProduction);
console.log(
  "Database URL:",
  isProduction ? process.env.DATABASE_URL : connectionString
);

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = {
  query: (text, params) => {
    console.log("Executing query:", text);
    return pool.query(text, params);
  },
  pool: pool,
};
/* LOCAL IMPLENTATION
module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
*/
