import { Router } from "express";
import { upload } from "../middleware/upload.js";
import {
  createGame,
  getGames,
  getGameById,
  updateGame,
  deleteGame,
} from "../controllers/gameControllers.js";

import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/adminOnly.js"; // ✅ FIX: missing import

const router = Router();

// Image fields: image (1), coverImage (1), screenshots (up to 3)
const gameUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
  { name: "screenshots", maxCount: 3 },
]);

/**
 */
router.post("/", protect, adminOnly, gameUpload, createGame);

router.get("/", getGames);

router.get("/:id", getGameById);


router.put("/:id", protect, adminOnly, gameUpload, updateGame);


router.delete("/:id", protect, adminOnly, deleteGame);

export default router;