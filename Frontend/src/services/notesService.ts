/**
 * @file notesService.ts
 * Service module for managing notes-related API calls.
 * @module services/notesService
 */

/**
 * services
 */
import axiosInstance from "./axiosInstance";

/**
 * @description Creates a new note with the specified title and content.
 * @param title - The title of the note to be created.
 * @param content - The content of the note to be created.
 * @returns A promise that resolves to the data of the created note.
 */
export const createNote = async (title: string, content: string) => {
    try {
        const response = await axiosInstance.post("/", { title, content });
        return response.data;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
};
