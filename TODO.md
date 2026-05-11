# TODO - Super Admin Dashboard (MERN)

## Step 1: Backend user management APIs
- [ ] Create controller for users: get all users (super_admin only)
- [ ] Create controller for assignment: assign user to team (super_admin only) and update User.team + Team.members
- [ ] Add routes for the above and mount in server.js

## Step 2: Frontend Super Admin UI on /teams
- [ ] Replace static `frontend/src/pages/Teams.jsx` with minimal responsive UI
- [ ] UI sections: create team, list teams, list users, assign user to team
- [ ] Call backend endpoints using existing axios instance

## Step 3: Basic verification
- [ ] Run backend + frontend
- [ ] Test with super_admin role token
- [ ] Verify unauthorized access blocked

