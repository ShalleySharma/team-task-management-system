const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  createTeam,
  getTeams
} = require("../controllers/teamController");

router.post("/", auth, createTeam);
router.get("/", auth, getTeams);

module.exports = router;