import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

// 👑 Make user admin (ONLY ADMIN CAN DO THIS)
router.put("/make-admin/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({
      message: "User promoted to admin",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;