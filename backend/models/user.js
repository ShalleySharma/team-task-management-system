const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["super_admin", "team_admin", "member"],
    default: "member"
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  }
});

module.exports = mongoose.model("User", userSchema);