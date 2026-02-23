const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pern_db",
  password: "0208", // 👈 your postgres password
  port: 5432,
});

module.exports = pool;