/**
 * dependecies
 */
import { Router } from "express";

/**
 * Controller
 */
import { createNote,getAllNotes } from "../controllers/noteController.js";

const router = Router();

/** Routes */

/**
 * @description Route to create a new note.
 * @route POST /api/notezilla/
 * @access Public
 * @function createNote
 * @param {Object} req - The request object containing the note data in the body.
 * @param {Object} res - The response object used to send back the created note or an error message.
 * @returns {Promise<void>} A JSON response with the created note data or an error message.
 */
router.post("/", createNote);
    
/**
 * @description Route to get all notes.
 * @route GET /api/notezilla/getAllNotes
 * @access Public
 * @function getAllNotes
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the notes or an error message.
 * @returns {Promise<void>} A JSON response with the notes data or an error message.
 */
router.get("/getAllNotes", getAllNotes);

export default router;
