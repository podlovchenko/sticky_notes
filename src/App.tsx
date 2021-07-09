import './App.css';

import {
    RootState,
    AppDispatch,
} from './app/store';
import {
    INotePosition,
    NoteId,
} from './types/notes';

import React, {
    useEffect,
    useState,
} from 'react';
import {
    useSelector,
    useDispatch,
} from 'react-redux';

import {
    addNote,
    editNoteText,
    editNotePosition,
    removeNote,
    fetchNotes,
} from './features/notes/notesActions';

import NotesList from './components/NotesList/NotesList';

function App() {
    const notes = useSelector((state: RootState) => Object.values(state.notes.items));
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchNotes());
    }, [])

    const [editNoteId, setEditNoteId] = useState<NoteId | null>(null);

    const onFinishMove = (id: NoteId, position: INotePosition) => {
        dispatch(editNotePosition(id, position));
    };
    const addButtonOnClick = () => {
        const note = dispatch(addNote());

        setEditNoteId(note.id);
    };
    const NotesListProps = {
        notes,
        editNoteId,
        onFinishMove,
        onRemoveNote: (id: NoteId) => dispatch(removeNote(id)),
        onStartEditNote: (id: NoteId) => setEditNoteId(id),
        onFinishEditNote: (id: NoteId, text: string) => {
            dispatch(editNoteText(id, text));

            setEditNoteId(null);
        },
    };

    return (
        <>
            <NotesList {...NotesListProps} />
            <button
                className={'notes-list__add-button'}
                onClick={addButtonOnClick}
            >
                ADD
            </button>
        </>
    );
}

export default App;
