const pool = require("../config/db");

exports.getUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;

    const newUser = await pool.query(
      "INSERT INTO users(name) VALUES($1) RETURNING *",
      [name]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await pool.query(
      "UPDATE users SET name=$1 WHERE id=$2 RETURNING *",
      [name, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM users WHERE id=$1", [id]);

    res.json("User deleted");
  } catch (err) {
    console.error(err.message);
  }
};