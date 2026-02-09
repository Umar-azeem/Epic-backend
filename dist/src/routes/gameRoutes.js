"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameControllers_1 = require("../controllers/gameControllers");
const router = express_1.default.Router();
router.post("/", gameControllers_1.createGame);
router.get("/", gameControllers_1.getGames);
router.get("/:id", gameControllers_1.getGameById);
router.put("/:id", gameControllers_1.updateGame);
router.delete("/:id", gameControllers_1.deleteGame);
exports.default = router;
//# sourceMappingURL=gameRoutes.js.map