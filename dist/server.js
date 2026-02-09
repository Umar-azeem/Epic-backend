import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import gameRoutes from "./src/routes/gameRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Server running auto!");
});
// Routes
app.use("/api/games", gameRoutes);
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error("MONGO_URI is missing in .env file");
}
mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected ❤️"))
    .catch((err) => console.error(err));
mongoose.connect(mongoUri);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
