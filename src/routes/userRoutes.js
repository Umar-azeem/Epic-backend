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

// ========== WISHLIST ROUTES ==========

// ✅ Add to wishlist
router.post("/wishlist", protect, async (req, res) => {
  try {
    const { gameId, gameData } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Initialize wishlist if it doesn't exist
    if (!user.wishlist) {
      user.wishlist = [];
    }
    
    // Check if game already exists in wishlist
    const alreadyExists = user.wishlist.some(item => item.gameId === gameId);
    
    if (alreadyExists) {
      return res.status(400).json({ message: "Game already in wishlist" });
    }
    
    // Add to wishlist
    user.wishlist.push({ 
      gameId, 
      gameData, 
      addedAt: new Date() 
    });
    
    await user.save();
    
    res.json({ 
      message: "Added to wishlist", 
      wishlist: user.wishlist 
    });
  } catch (err) {
    console.error("Wishlist add error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get user's wishlist
router.get("/wishlist", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user.wishlist || []);
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Remove from wishlist
router.delete("/wishlist/:gameId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const gameIdToRemove = req.params.gameId;
    const initialLength = user.wishlist?.length || 0;
    
    user.wishlist = (user.wishlist || []).filter(
      item => item.gameId !== gameIdToRemove
    );
    
    if (user.wishlist.length === initialLength) {
      return res.status(404).json({ message: "Game not found in wishlist" });
    }
    
    await user.save();
    
    res.json({ 
      message: "Removed from wishlist", 
      wishlist: user.wishlist 
    });
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Check if game is in wishlist
router.get("/wishlist/check/:gameId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const isInWishlist = (user.wishlist || []).some(
      item => item.gameId === req.params.gameId
    );
    
    res.json({ isInWishlist });
  } catch (err) {
    console.error("Check wishlist error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;