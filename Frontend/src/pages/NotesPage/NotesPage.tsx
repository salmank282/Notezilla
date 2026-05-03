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

interface NotesPageProps {
  searchNote: string;
}

const NotesPage: React.FC<NotesPageProps> = ({ searchNote }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { noNotesMessage } = NoteZillaStringHelper.noNotes;
  const navigate = useNavigate();

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

  const noteView = (id: string) => {
    navigate(`/notes/${id}`);
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
            </div>
          ))}
      </div>
    </>
  );
};

export default NotesPage;
