import './NotesList.css';
import {
    INotePosition,
    NoteId,
    INote,
} from '../../types/notes';

import React from 'react';

import DroppableWrapper from '../DroppableWrapper/DroppableWrapper';
import Note from '../Note/Note';


interface IProps {
    notes: INote[];
    editNoteId: NoteId | null;
    onFinishMove: any;
    onRemoveNote: any;
    onStartEditNote: any;
    onFinishEditNote: any;
}

function NotesList({
    notes,
    editNoteId,
    onFinishMove,
    onRemoveNote,
    onFinishEditNote,
    onStartEditNote,
}: IProps) {
    return (
        <div className={'notes-list'}>
            {notes.map(note => {
                const {
                    id: noteId,
                } = note;
                const droppableWrapperProps = {
                    initialPosition: note.position,
                    onFinishMove: (position: INotePosition) => onFinishMove(noteId, position),
                };
                const noteProps = {
                    note,
                    isEdit: editNoteId === noteId,
                    onRemove: onRemoveNote,
                    onStartEdit: onStartEditNote,
                    onFinishEdit: onFinishEditNote,
                };

                return (
                    <DroppableWrapper
                        key={noteId}
                        {...droppableWrapperProps}
                    >
                        <Note {...noteProps} />
                    </DroppableWrapper>
                );
            })}
        </div>
    );
}

export default NotesList;
