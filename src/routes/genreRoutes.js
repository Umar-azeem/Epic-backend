import { Router } from "express";
import {
  createGenre, getGenres, getGenreById, updateGenre, deleteGenre,
} from "../controllers/genreControllers.js";

const router = Router();

router.post(  "/",    createGenre);
router.get(   "/",    getGenres);
router.get(   "/:id", getGenreById);
router.put(   "/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
