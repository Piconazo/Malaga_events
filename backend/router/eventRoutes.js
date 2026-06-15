const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
} = require("../Controllers/eventController");

// Sin autenticación
router.get("/", getEvents);
router.get("/:id", getEventById);

// Con autenticación
router.post("/:id/join", verifyToken, joinEvent);
router.delete("/:id/leave", verifyToken, leaveEvent);

// Solo admin
router.post("/", verifyToken, adminMiddleware, createEvent);
router.patch("/:id", verifyToken, adminMiddleware, updateEvent);
router.delete("/:id", verifyToken, adminMiddleware, deleteEvent);

module.exports = router;
