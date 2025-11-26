/**
 * dependecies
 */
import { Router } from "express";

/**
 * Controller
 */
import { createNote } from "../controllers/noteController.js";

const router = Router();

router.post("/", createNote);

export default router;
