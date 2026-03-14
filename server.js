import express  from "express";
import mongoose from "mongoose";
import dotenv   from "dotenv";
import cors     from "cors";

import gameRoutes      from "./src/routes/gameRoutes.js";
import publisherRoutes from "./src/routes/publisherRoutes.js";
import genreRoutes     from "./src/routes/genreRoutes.js";
import reviewRoutes    from "./src/routes/reviewRoutes.js";

dotenv.config();

const app = express();

/* ── Middleware ── */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ── Health check ── */
app.get("/", (req, res) => res.json({ status: "GameVault API running ✅" }));

/* ── API Routes ── */
app.use("/api/games",      gameRoutes);
app.use("/api/publishers", publisherRoutes);
app.use("/api/genres",     genreRoutes);
app.use("/api/reviews",    reviewRoutes);

/* ── 404 handler ── */
app.use((req, res) => res.status(404).json({ message: `Route ${req.url} not found` }));

/* ── Global error handler ── */
app.use((err, req, res, next) => {
  console.error("Global error:", err.message);
  res.status(500).json({ message: err.message || "Internal server error" });
});

/* ── MongoDB ── */
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) throw new Error("MONGO_URI missing in .env");

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => { console.error("MongoDB error:", err); process.exit(1); });

/* ── Listen ── */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`));

export default app;
