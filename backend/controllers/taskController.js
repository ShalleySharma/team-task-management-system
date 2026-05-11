const Task = require("../models/Task");

function buildTeamScopedFilter(req, extra = {}) {
  const role = req.user?.role;

  // super_admin can access everything
  if (role === "super_admin") {
    return { deleted: false, ...extra };
  }

  // team_admin + member are team-scoped
  const teamId = req.user?.team;
  return {
    deleted: false,
    team: teamId,
    ...extra
  };
}

exports.createTask = async (req, res) => {
  const { role, team } = req.user;

  if (role === "member") {
    return res.status(403).json({ message: "Forbidden" });
  }

  // team_admin must create tasks in their own team
  if (role === "team_admin" && req.body.team?.toString() !== team?.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // If team_admin forgot to send team, set it automatically
  const payload = {
    ...req.body,
    team: role === "team_admin" ? team : req.body.team
  };

  const task = await Task.create(payload);
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const limit = 5;

  const role = req.user?.role;

  let filter = {
    title: { $regex: search, $options: "i" }
  };

  if (role === "super_admin") {
    filter = { deleted: false, ...filter };
  } else if (role === "team_admin") {
    filter = {
      ...buildTeamScopedFilter(req, {}),
      title: { $regex: search, $options: "i" }
    };
  } else {
    // member: only tasks within their team and assigned to them
    filter = {
      ...buildTeamScopedFilter(req, {}),
      assignedTo: req.user?.id,
      title: { $regex: search, $options: "i" }
    };
  }

  const tasks = await Task.find(filter)
    .populate("assignedTo")
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const role = req.user?.role;
  const userId = req.user?.id;
  const teamId = req.user?.team;


  const existing = await Task.findById(req.params.id);
  if (!existing || existing.deleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (role === "member") {
    if (existing.team?.toString() !== teamId?.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (existing.assignedTo?.toString() !== userId?.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
  }

  if (role === "team_admin") {
    if (existing.team?.toString() !== teamId?.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
  }

  // super_admin can update any
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const role = req.user?.role;
  const userId = req.user?.id;
  const teamId = req.user?.team;

  const existing = await Task.findById(req.params.id);
  if (!existing || existing.deleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (role === "member") {
    // Member cannot delete (per requirements)
    return res.status(403).json({ message: "Forbidden" });
  }

  if (role === "team_admin") {
    if (existing.team?.toString() !== teamId?.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
  }

  await Task.findByIdAndUpdate(req.params.id, { deleted: true });
  res.json({ message: "Task deleted" });
};
