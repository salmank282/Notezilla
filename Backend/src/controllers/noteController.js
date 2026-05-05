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
 * @returns {Object} A JSON response indicating the success or failure of the note creation.
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

/**
 * @description Retrieves all notes from the database and sends them in the response.
 */
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      count: notes.length,
      message: "Notes retrieved successfully",
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      error: err.message,
    });
  }
};

/**
 * @description Retrieves a note by its ID from the database and sends it in the response.
 */
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching note",
      error: err.message,
    });
  }
};

/**
 * @description Updates a note by its ID in the database and sends the updated note in the response.
 */
export const updateNoteById = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating note",
      error: err.message,
    });
  }
};

/**
 * @description Deletes a note by its ID from the database and sends a success message in the response.
 */
export const deleteNoteById = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting note",
      error: err.message,
    });
  }
};
