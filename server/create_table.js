const pool = require("./config/db");

async function createTable() {
    try {
        console.log("Attempting to create 'drivers' table...");
        await pool.query(`
      CREATE TABLE IF NOT EXISTS drivers (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          license_number VARCHAR(100) UNIQUE,
          phone VARCHAR(20)
      );
    `);
        console.log("SUCCESS: 'drivers' table created or already exists.");
        process.exit(0);
    } catch (err) {
        console.error("CREATE TABLE ERROR:", err.message);
        process.exit(1);
    }
}

createTable();
