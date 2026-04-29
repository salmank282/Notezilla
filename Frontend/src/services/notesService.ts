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

class NotesService {


    /**
 * @description Creates a new note with the specified title and content.
 * @param title - The title of the note to be created.
 * @param content - The content of the note to be created.
 * @returns A promise that resolves to the data of the created note.
    */
    async createNote(title: string, content: string): Promise<ApiResponse<Note>> {
        const payload = { title, content };

        try {
            const response = await axiosInstance.post<ApiResponse<Note>>("/", payload);
            return response.data;
        } catch (error) {
            console.error("Error creating note:", error);
            throw error;
        }
    }

    async getAllNotes(): Promise<Note[]> {
        try {
            const response = await axiosInstance.get<ApiResponse<Note[]>>(Api.getAllNotes);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw error;
        }
    }

}

export const notesService = new NotesService();
