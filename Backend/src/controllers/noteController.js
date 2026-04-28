/**
 * models
 */
import Note from "../models/noteModel.js";

/**
 * @description Creates a new note and saves it to the database.
 *
 * @function createNote
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing note data.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the created note data or an error message.
 *
 * @throws {Error} If there is an issue saving the note to the database.
 */
export const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving data",
      error: err.message,
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()

    res.status(200).json({
      success: true,
      count: notes.length,
      message: "Notes retrieved successfully",
      data: notes,
    });
  }catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      error: err.message,
    })
  };
}
