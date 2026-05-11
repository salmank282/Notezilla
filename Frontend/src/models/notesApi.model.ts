import type { NoteTag } from "./noteTag.model";

export interface Note {
    _id: string;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    count?: number;
    data: T;
}