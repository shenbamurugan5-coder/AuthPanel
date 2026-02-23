const pool = require("../config/db");

exports.getDrivers = async (req, res) => {
    try {
        const drivers = await pool.query("SELECT * FROM drivers ORDER BY id ASC");
        res.json(drivers.rows);
    } catch (err) {
        console.error("GET DRIVERS ERROR:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.addDriver = async (req, res) => {
    try {
        const { name, license_number, phone } = req.body;
        const newDriver = await pool.query(
            "INSERT INTO drivers (name, license_number, phone) VALUES ($1, $2, $3) RETURNING *",
            [name, license_number, phone]
        );
        res.json(newDriver.rows[0]);
    } catch (err) {
        console.error("ADD DRIVER ERROR:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, license_number, phone } = req.body;
        const updated = await pool.query(
            "UPDATE drivers SET name=$1, license_number=$2, phone=$3 WHERE id=$4 RETURNING *",
            [name, license_number, phone, id]
        );
        res.json(updated.rows[0]);
    } catch (err) {
        console.error("UPDATE DRIVER ERROR:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM drivers WHERE id=$1", [id]);
        res.json({ message: "Driver deleted" });
    } catch (err) {
        console.error("DELETE DRIVER ERROR:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
