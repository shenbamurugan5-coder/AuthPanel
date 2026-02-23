const router = require("express").Router();
const { getDrivers, addDriver, updateDriver, deleteDriver } = require("../controllers/driverController");
const authMiddleware = require("../middleware/authMiddleware");

// All driver routes are protected
router.use(authMiddleware);

router.get("/", getDrivers);
router.post("/", addDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

module.exports = router;
