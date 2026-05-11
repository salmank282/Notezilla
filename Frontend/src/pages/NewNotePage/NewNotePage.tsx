/**
 *  @dependencies
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/**
 * styles
 */
import "./NewNotePage.css";

/**
 * services
 */
import { notesService } from "../../services/notesService";
import { useSpeechRecognition } from "../../services/useSpeechRecognition";
import {
  NOTE_TAGS,
  formatNoteTag,
  isNoteTag,
} from "../../models/noteTag.model";
import type { NoteTag } from "../../models/noteTag.model";

/**
 * Additonal libraries
 */
import { ToastContainer, toast } from "react-toastify";

/**
 * utils
 */
import NoteZillaStringHelper from "../../utils/StringHelper";

/**
 * icons
 */
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSaveOutline } from "react-icons/io5";
import { PiMicrophoneDuotone } from "react-icons/pi";

const NewNotePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("personal");
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState<"title" | "content" | null>(
    null,
  );

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setTitle("");
      setContent("");
      setTag("personal");
    }
  }, [id]);

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          const Note = await notesService.getNoteById(id);
          setTitle(Note.title);
          setContent(Note.content);
          setTag(isNoteTag(Note.tag) ? Note.tag : "personal");
        } catch (error) {
          console.error(`Error fetching note with ID ${id}:`, error);
        }
      }
    };

    fetchNote();
  }, [id]);

  const { transcript, isListening, startListening, stopListening } =
    useSpeechRecognition();

  useEffect(() => {
    if (!isListening) return;
    if (activeField === "title") {
      setTitle(transcript);
    } else if (activeField === "content") {
      setContent(transcript);
    }
  }, [transcript, isListening, activeField]);

  /**
   * cHandles the change event for the note title input field.
   * @param title - The new title value entered by the user.
   */
  const onTitleChange = (title: string) => {
    setTitle(title);
  };

  /**
   * @description Handles changes to the note content.
   * @param content - The updated content of the note as a string.
   */
  const onContentChange = (content: string) => {
    setContent(content);
  };

  /**
   * @description Handles the save operation for a new note.
   * This function validates the note's title to ensure it is not empty.
   * If the title is valid, it attempts to save the note by calling the `createNote` function.
   * During the save operation, a loading state is set to provide user feedback.
   * @returns {Promise<void>} A promise that resolves when the save operation is complete.
   */
  const onSaveNote = async () => {
    if (!title.trim()) {
      toast("Title cannot be empty", { type: "error" });
      return;
    }

    setLoading(true);

    try {
      if (id) {
        const res = await notesService.updateNoteById(id, title, content, tag);
        toast("Note updated successfully!", { type: "success" });
        setTitle(res.title);
        setContent(res.content);
        setTag(isNoteTag(res.tag) ? res.tag : "personal");
        return;
      }
      await notesService.createNote(title, content, tag);
      toast("Note saved successfully!", { type: "success" });
      setTitle("");
      setContent("");
      setTag("personal");
    } catch (err) {
      console.error("Error saving note:", err);
      toast("Failed to save note. Please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Handles the deletion of a note. This function checks if a note ID is present, and if so, it attempts to delete the note using the `deleteNoteById` service function. Upon successful deletion, it displays a success toast message and clears the title and content state. If an error occurs during deletion, it logs the error and shows an error toast message.
   */
  const deleteNote = async () => {
    if (!id) return;

    try {
      await notesService.deleteNoteById(id);
      toast("Note deleted successfully!", { type: "success" });
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(`Error deleting note with ID ${id}:`, error);
      toast("Failed to delete note. Please try again.", { type: "error" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-[#FAEBD7] h-full p-4 relative">
        <div className="title-container">
          <div className="title-input-group">
            <input
              type="text"
              onFocus={() => setActiveField("title")}
              onChange={(e) => {
                onTitleChange(e.target.value);
              }}
              value={title}
              className="title-input"
              placeholder="Title"
            />
          </div>
          <div className="title-Icons">
            <div className="tag-selector-row">
              <label htmlFor="note-tag" className="tag-selector-label">
                {NoteZillaStringHelper.title.tagTitle}
              </label>
              <select
                id="note-tag"
                value={tag}
                onChange={(e) => setTag(e.target.value as NoteTag)}
                className="tag-selector"
              >
                {NOTE_TAGS.map((tagOption) => (
                  <option key={tagOption} value={tagOption}>
                    {formatNoteTag(tagOption)}
                  </option>
                ))}
              </select>
            </div>
            {id && (
              <div onClick={deleteNote}>
                <RiDeleteBin6Line className="cursor-pointer" />
              </div>
            )}
            <div className="save-btn" onClick={onSaveNote}>
              <IoSaveOutline className="save-icon" />
              {id
                ? loading
                  ? "Updating.."
                  : "Update"
                : loading
                  ? "Saving.."
                  : "Save"}
            </div>
          </div>
        </div>
        <div className="underline"></div>
        <div className="content-container">
          <textarea
            onFocus={() => setActiveField("content")}
            onChange={(e) => onContentChange(e.target.value)}
            value={content}
            className="content-input"
          />
        </div>
        <div className="mic-container">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`mic-btn ${isListening ? "active" : ""}`}
            disabled={activeField === null}
          >
            <PiMicrophoneDuotone />
          </button>
        </div>
      </div>
    </>
  );
};

export default NewNotePage;
