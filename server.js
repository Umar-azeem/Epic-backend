import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/gameRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();
/* ===== Middleware ===== */
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: "*", // testing ke liye
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
/* ===== Test Route ===== */
app.get("/", (req, res) => {
    res.send("Server running auto!");
});
/* ===== Routes ===== */
app.use("/api/games", router);
/* ===== MongoDB ===== */
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error("MONGO_URI is missing in .env file");
}
mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected ❤️"))
    .catch((err) => console.error("Mongo error:", err));
/* ===== Server ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
