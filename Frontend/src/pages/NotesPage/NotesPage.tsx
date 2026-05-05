/**
 * @dependencies
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * styles
 */
import "./NotesPage.css";

/**
 * services
 */
import { notesService } from "../../services/notesService";

/**
 * models
 */
import type { Note } from "../../models/notesUi.model";

/**
 * utils
 */
import NoteZillaStringHelper from "../../utils/StringHelper";

/**
 * icons
 */
import { RiDeleteBin6Line } from "react-icons/ri";

interface NotesPageProps {
  searchNote: string;
}

const NotesPage: React.FC<NotesPageProps> = ({ searchNote }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { noNotesMessage } = NoteZillaStringHelper.noNotes;
  const navigate = useNavigate();

  /**
   * @description Fetches all notes from the server when the component mounts and updates the state with the fetched notes.
   * The fetched notes are mapped to the Note interface before being stored in the state. If there is an error during the fetch operation, it is logged to the console.
   */
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await notesService.getAllNotes();
        const mappedNotes: Note[] = fetchedNotes.map((note) => ({
          id: note._id,
          title: note.title,
          content: note.content,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
        }));
        setNotes(mappedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  /**
   * @description Navigates to the note view page for the specified note Id
   */
  const noteView = (id: string) => {
    navigate(`/notes/${id}`);
  };

  /**
   * @description Deletes a note with the specified ID after confirming the action with the user. If the user confirms the deletion
   * @param e The mouse event triggered by clicking the delete button
   * @param id The ID of the note to be deleted
   */
  const deleteNote = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (confirmDelete) {
      notesService
        .deleteNoteById(id)
        .then(() => {
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    }
  };

  return (
    <>
      {!notes.length && <div className="no-notes">{noNotesMessage}</div>}
      <div className="all-notes-container">
        {notes
          .filter((note) =>
            note.title.toLowerCase().includes(searchNote.toLowerCase()),
          )
          .map((note) => (
            <div
              className="note-card"
              onClick={() => noteView(note.id)}
              key={note.id}
            >
              <div className="note-title">{note.title}</div>
              <div className="note-content">{note.content}</div>
              <div
                className="note-actions"
                onClick={(e) => deleteNote(e, note.id)}
              >
                <RiDeleteBin6Line className="cursor-pointer" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default NotesPage;
