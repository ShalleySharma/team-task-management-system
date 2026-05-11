const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


router.get("/", auth, (req, res) => {
  res.json({ ok: true });
});

module.exports = router;

