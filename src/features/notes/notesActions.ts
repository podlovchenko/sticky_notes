import {
    INotePosition,
    NoteId,
} from '../../types/notes';

import {
    v4 as uuidv4,
} from 'uuid';

import {
    add,
    edit,
    remove,
} from './notesSlice';

export function fetchNotes() {
    return (dispatch: Function) => {
        try {
            Object.values(localStorage).forEach(item => {
                const note = JSON.parse(item);
                dispatch(add(note));
            })
        } catch (ex) {
            console.log(ex);
        }
    };
}

export function addNote(text = '') {
    return (dispatch: Function) => {
        const id = uuidv4();
        const note = {
            id,
            text,
        }

        localStorage[id] = JSON.stringify(note);

        dispatch(add(note));

        return note;
    };
}

export function editNoteText(id: NoteId, text: string) {
    return (dispatch: Function) => {
        const note = JSON.parse(localStorage[id]);
        note.text = text;
        localStorage[id] = JSON.stringify(note);

        dispatch(edit(note));
    };
}

export function editNotePosition(id: NoteId, position: INotePosition) {
    return (dispatch: Function) => {
        const note = JSON.parse(localStorage[id]);
        note.position = position;
        localStorage[id] = JSON.stringify(note);

        dispatch(edit(note));
    };
}

export function removeNote(id: NoteId) {
    return (dispatch: Function) => {
        delete localStorage[id];

        dispatch(remove(id));
    };
}