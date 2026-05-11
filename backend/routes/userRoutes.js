const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  assignUserToTeam
} = require("../controllers/userController");

// Super admin: view all users
router.get("/", auth, role("super_admin"), getAllUsers);

// Super admin: assign a user to a team
router.post(
  "/:userId/team",
  auth,
  role("super_admin"),
  assignUserToTeam
);

module.exports = router;

