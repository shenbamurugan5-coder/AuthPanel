const pool = require("./config/db");

async function checkTable() {
    try {
        const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'drivers'
    `);

        if (res.rows.length > 0) {
            console.log("SUCCESS: 'drivers' table exists.");
            const columns = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'drivers'
      `);
            console.log("Columns:", columns.rows);
        } else {
            console.log("ERROR: 'drivers' table DOES NOT exist.");
        }
        process.exit(0);
    } catch (err) {
        console.error("DB CHECK ERROR:", err.message);
        process.exit(1);
    }
}

checkTable();
