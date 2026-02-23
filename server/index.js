const express = require("express");
const cors = require("cors");

const app = express();   // ✅ MUST COME FIRST

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API! Use /api/auth/login to login." });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);

app.listen(5000, () => {
  console.log("Server started on 5000");
});