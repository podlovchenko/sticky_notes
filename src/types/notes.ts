export type NoteId = string;

export interface INotePosition {
    x: number;
    y: number;
}

export interface INote {
    id: NoteId;
    text: string;
    position?: INotePosition;
}