const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Placeholder (not currently implemented in UI).
// If you later add endpoint to manage team members by team_admin/super_admin,
// put it here.

router.get("/", auth, (req, res) => {
  res.json({ ok: true });
});

module.exports = router;

