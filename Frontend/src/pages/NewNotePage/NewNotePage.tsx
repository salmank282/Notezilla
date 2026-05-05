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

  const {id} = useParams();

  useEffect(() => {
    if(!id){
      setTitle("");
      setContent("");
    }
  },[id])

  useEffect(() => { 
    const fetchNote = async () => {
      if(id) {
        try{
          const Note = await notesService.getNoteById(id);
          setTitle(Note.title);
          setContent(Note.content);
        }catch(error){
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
   * @returns {Promise<void>} A promise that resolves when the save operation is complete.
   */
  const onSaveNote = async () => {
    if (!title.trim()) {
      toast("Title cannot be empty", { type: "error" });
      return;
    }

    setLoading(true);

    try {
      if(id){
          const res= await notesService.updateNoteById(id, title, content);
          toast("Note updated successfully!", { type: "success" });
          setTitle(res.title);
          setContent(res.content);
          return;
      }
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


  /**
   * @description Handles the deletion of a note. This function checks if a note ID is present, and if so, it attempts to delete the note using the `deleteNoteById` service function. Upon successful deletion, it displays a success toast message and clears the title and content state. If an error occurs during deletion, it logs the error and shows an error toast message.
   */
  const deleteNote = async () => {
    if (!id) return;

    try{
      await notesService.deleteNoteById(id);
      toast("Note deleted successfully!", { type: "success" });
      setTitle("");
      setContent("");
    }catch(error){
      console.error(`Error deleting note with ID ${id}:`, error);
      toast("Failed to delete note. Please try again.", { type: "error" });
    }
  }
  

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
           {id && <div onClick={deleteNote}><RiDeleteBin6Line className="cursor-pointer" /></div>}
            <FaRegStar className="cursor-pointer" />
            <div className="save-btn" onClick={onSaveNote}>
              <IoSaveOutline className="save-icon" />
              {id ? loading ? "Updating.." : "Update" : loading ? "Saving.." : "Save"}
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
