import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only admin can access this route
router.get("/admin", verifyToken, (req, res) => {
  res.json({ message: "Welcome admin" });
});

// Both admin and manager can access this route
router.get("/manager", verifyToken, (req, res) => {
  res.json({ message: "Welcome manager" });
});

// All users can access this route
router.get("/user", verifyToken, (req, res) => {
  res.json({ message: "Welcome user" });
});

export default router;
