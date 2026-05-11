export const NOTE_TAGS = ["favorite", "work", "personal", "ideas"] as const;

export type NoteTag = (typeof NOTE_TAGS)[number];

export const isNoteTag = (value: string): value is NoteTag =>
    NOTE_TAGS.includes(value as NoteTag);

export const formatNoteTag = (tag: string) =>
    tag.charAt(0).toUpperCase() + tag.slice(1);