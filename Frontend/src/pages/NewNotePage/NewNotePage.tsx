/**
 *  @dependencies
 */
import React, { useState, useEffect } from "react";

/**
 * styles
 */
import "./NewNotePage.css";

/**
 * services
 */
import { notesService } from "../../services/notesService";
import { useSpeechRecognition } from "../../services/useSpeechRecognition";

/**
 * Additonal libraries
 */
import { ToastContainer, toast } from "react-toastify";

/**
 * icons
 */
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { PiMicrophoneDuotone } from "react-icons/pi";

const NewNotePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState<"title" | "content" | null>(null);

  const { transcript, isListening, startListening, stopListening } =
    useSpeechRecognition();

  useEffect(() => {
    if (!isListening) return;
    if(activeField === "title") {
      setTitle(transcript);
    } else if(activeField === "content") {
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
   * @async
   * @function`
   * @returns {Promise<void>} A promise that resolves when the save operation is complete.
   */
  const onSaveNote = async () => {
    console.log(title, content);

    if (!title.trim()) {
      toast("Title cannot be empty", { type: "error" });
      return;
    }

    setLoading(true);

    try {
      await notesService.createNote(title, content);
      toast("Note saved successfully!", { type: "success" });
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error saving note:", err);
      toast("Failed to save note. Please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-[#FAEBD7] h-full p-4 relative">
        <div className="title-container">
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
          <div className="title-Icons">
            <RiDeleteBin6Line className="cursor-pointer" />
            <FaRegStar className="cursor-pointer" />
            <div className="save-btn" onClick={onSaveNote}>
              <IoSaveOutline className="save-icon" />{" "}
              {loading ? "Saving.." : "Save"}
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
            className={`mic-btn ${isListening ? 'active' : ''}`}
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
