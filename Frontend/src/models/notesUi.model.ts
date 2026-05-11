import type { NoteTag } from "./noteTag.model";

export interface Note {
    id: string;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
}