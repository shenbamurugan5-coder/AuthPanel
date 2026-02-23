const router = require("express").Router();
const userRoutes = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.use(authMiddleware);

// Only Superusers can access User Management
router.get("/", isAdmin, userRoutes.getUsers);
router.post("/", isAdmin, userRoutes.addUser);
router.delete("/:id", isAdmin, userRoutes.deleteUser);
router.put("/:id", isAdmin, userRoutes.updateUser);
module.exports = router;