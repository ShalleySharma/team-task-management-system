const User = require("../models/User");
const Team = require("../models/Team");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().populate("team");
  res.json(users);
};

exports.assignUserToTeam = async (req, res) => {
  const { userId } = req.params;
  const { teamId } = req.body;

  if (!teamId) {
    return res.status(400).json({ message: "teamId is required" });
  }

  const [user, team] = await Promise.all([
    User.findById(userId),
    Team.findById(teamId)
  ]);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  // Update membership links consistently.
  // 1) Remove user from any previous team.
  const prevTeamId = user.team;
  if (prevTeamId) {
    await Team.updateOne(
      { _id: prevTeamId },
      { $pull: { members: user._id } }
    );
  }

  // 2) Add user to new team.
  await Team.updateOne(
    { _id: team._id },
    { $addToSet: { members: user._id } }
  );

  // 3) Set user's team.
  user.team = team._id;
  await user.save();

  // Return updated entities.
  const updatedUser = await User.findById(user._id).populate("team");
  const updatedTeam = await Team.findById(team._id).populate("members");

  res.json({ user: updatedUser, team: updatedTeam });
};

