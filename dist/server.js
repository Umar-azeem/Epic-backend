"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const gameRoutes_js_1 = __importDefault(require("./src/routes/gameRoutes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Server running auto!");
});
// Routes
app.use("/api/games", gameRoutes_js_1.default);
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error("MONGO_URI is missing in .env file");
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected ❤️"))
    .catch((err) => console.error(err));
mongoose_1.default.connect(mongoUri);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map