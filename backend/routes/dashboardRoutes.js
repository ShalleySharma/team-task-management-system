const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const Team = require("../models/Team");
const User = require("../models/User");

router.get("/summary", auth, async (req, res) => {
  const role = req.user?.role;
  const userId = req.user?.id;
  const teamId = req.user?.team;

  let taskFilter = { deleted: false };
  if (role === "team_admin") {
    taskFilter = { deleted: false, team: teamId };
  }
  if (role === "member") {
    taskFilter = { deleted: false, team: teamId, assignedTo: userId };
  }

  const [totalTasks, completedTasks, pendingTasks] = await Promise.all([
    Task.countDocuments({ ...taskFilter }),
    Task.countDocuments({ ...taskFilter, status: "completed" }),
    Task.countDocuments({ ...taskFilter, status: "pending" })
  ]);

  let teamsCount = 0;
  let teamMembersCount = 0;

  if (role === "super_admin") {
    teamsCount = await Team.countDocuments({});
    teamMembersCount = await User.countDocuments({});
  } else {
    teamsCount = 1;
    teamMembersCount = await User.countDocuments({ team: teamId });
  }

  res.json({
    role,
    teamsCount,
    teamMembersCount,
    totalTasks,
    completedTasks,
    pendingTasks
  });
});

module.exports = router;

