import { Router } from "express";
import { upload } from "../middleware/upload.js";
import {
  createPublisher, getPublishers, getPublisherById, updatePublisher, deletePublisher,
} from "../controllers/publisherControllers.js";

const router = Router();

const pubUpload = upload.fields([{ name: "logo", maxCount: 1 }]);

router.post(  "/",    pubUpload, createPublisher);
router.get(   "/",               getPublishers);
router.get(   "/:id",            getPublisherById);
router.put(   "/:id", pubUpload, updatePublisher);
router.delete("/:id",            deletePublisher);

export default router;
