/**
 * @file notesService.ts
 * Service module for managing notes-related API calls.
 * @module services/notesService
 */

/**
 * services
 */
import axiosInstance from "./axiosInstance";
import { Api } from "./api";

/**
 * models
 */
import type { Note, ApiResponse } from "../models/notesApi.model";
import type { NoteTag } from "../models/noteTag.model";

class NotesService {

    /**
   * @description Creates a new note with the specified title and content.
   * @param title - The title of the note to be created.
   * @param content - The content of the note to be created.
   * @returns A promise that resolves to the data of the created note.
   */
    async createNote(title: string, content: string, tag: NoteTag): Promise<Note> {
        const payload = { title, content, tag };

        try {
            const response = await axiosInstance.post<ApiResponse<Note>>("/", payload);
            return response.data.data;
        } catch (error) {
            console.error("Error creating note:", error);
            throw error;
        }
    }

    /**
     * @description Retrieves all notes from the server.
     * @returns A promise that resolves to an array of notes.
     * @throws Will throw an error if the API call fails.s
     */
    async getAllNotes(): Promise<Note[]> {
        try {
            const response = await axiosInstance.get<ApiResponse<Note[]>>(Api.getAllNotes);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw error;
        }
    }

    /**
     * @description Retrieves a note by its ID from the server.
     * @param noteId - The ID of the note to be retrieved.
     * @returns A promise that resolves to the note with the specified ID.
     * @throws Will throw an error if the API call fails.
     */
    async getNoteById(noteId: string): Promise<Note> {
        try {
            const response = await axiosInstance.get<ApiResponse<Note>>(`${Api.getNotebyId}/${noteId}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching note with ID ${noteId}:`, error);
            throw error;
        }
    }

    /**
     * @description Updates a note by its ID with the specified title and content.
     * @param noteId - The ID of the note to be updated.
     * @param title - The new title of the note.
     * @param content - The new content of the note.
     * @returns A promise that resolves to the updated note.
     * @throws Will throw an error if the API call fails.
     */
    async updateNoteById(noteId: string, title: string, content: string, tag: NoteTag): Promise<Note> {
        const payload = { title, content, tag };

        try {
            const response = await axiosInstance.put<ApiResponse<Note>>(`${Api.updateNoteById}/${noteId}`, payload);
            return response.data.data;
        } catch (error) {
            console.error(`Error updating note with ID ${noteId}:`, error);
            throw error;
        }
    }

    /**
     * @description Deletes a note by its ID from the server.
     * @param noteId - The ID of the note to be deleted.
     * @returns A promise that resolves to a success message upon successful deletion.
     * @throws Will throw an error if the API call fails.    
    */
    async deleteNoteById(noteId: string): Promise<string> {
        try {
            const response = await axiosInstance.delete<ApiResponse<null>>(`${Api.deleteNoteById}/${noteId}`);
            return response.data.message;
        } catch (error) {
            console.error(`Error deleting note with ID ${noteId}:`, error);
            throw error;
        }
    }
}

export const notesService = new NotesService();
