/**
 *  @dependencies
 */
import React, { useState } from "react";

/**
 * styles
 */
import "./NewNotePage.css";

/**
 * services
 */
import { createNote } from "../../services/notesService";

/**
 * icons
 */
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";

const NewNotePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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
      alert("Title cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const res = await createNote(title, content);
      console.log("Saved note:", res);
      alert("Note saved successfully!");

      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#FAEBD7] h-full p-4">
        <div className="title-container">
          <input
            type="text"
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
            onChange={(e) => onContentChange(e.target.value)}
            value={content}
            className="content-input"
          />
        </div>
      </div>
    </>
  );
};

export default NewNotePage;
