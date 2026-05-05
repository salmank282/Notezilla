/**
 * dependecies
 */
import { Router } from "express";

/** 
 * Controller
 */
import { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById } from "../controllers/noteController.js";

const router = Router();

/** Routes */

/**
 * @description Route to create a new note.
 */
router.post("/", createNote);

/**
 * @description Route to get all notes.
 */
router.get("/getAllNotes", getAllNotes);

/**
 * @description Route to get a note by its ID.
 */
router.get("/getNote/:id",getNoteById);

/**
 * @description Route to update a note by its ID.
 */
router.put("/updateNote/:id", updateNoteById);

/**
 * @description Route to delete a note by its ID.
 */
router.delete("/deleteNote/:id", deleteNoteById);

export default router;