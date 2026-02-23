const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("LOGIN BODY:", req.body); // debug

    // DEMO USERS
    let user = null;
    let role = "";

    if (username === "shenba" && password === "0208") {
      user = "shenba";
      role = "superuser";
    } else if (username === "admin" && password === "1234") {
      user = "admin";
      role = "staff";
    }

    if (user) {
      const token = jwt.sign(
        { user, role },
        "SECRET_KEY",
        { expiresIn: "1h" }
      );

      return res.json({ token, role, user });
    }

    console.log("LOGIN FAILED: Invalid credentials for", username);
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = { login };