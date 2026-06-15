const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  updatePassword,
} = require("../Controllers/userController");

router.get("/profile", verifyToken, getProfile);
router.patch("/profile", verifyToken, updateProfile);
router.patch("/password", verifyToken, updatePassword);

module.exports = router;
