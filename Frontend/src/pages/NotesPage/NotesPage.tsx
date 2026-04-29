/**
 *  @dependencies
 */
import React, { useEffect, useState } from "react";

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

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

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

  const noteView = () => {
    
  }

  return (
    <>
      <div className="all-notes-container">
        {notes.map((note) => (
          <div className="note-card" onClick={noteView} key={note.id}>
            <div className="note-title">{note.title}</div>
            <div className="note-content">{note.content}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotesPage;
