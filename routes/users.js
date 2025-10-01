const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

// Get current user profile
router.get("/me", getCurrentUser);

// Update current user profile
router.patch("/me", updateUser);

module.exports = router;
