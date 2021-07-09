import './Note.css';

import {
    INote,
    NoteId,
} from '../../types/notes';

import React, {
    useState,
} from 'react';

interface IProps {
    note: INote,
    isEdit: boolean;
    onRemove: (id: NoteId) => void;
    onStartEdit: (id: NoteId) => void;
    onFinishEdit: (id: NoteId, text: string) => void;
}

function Note({
    note: {
        id,
        text,
    },
    isEdit,
    onRemove,
    onStartEdit,
    onFinishEdit,
}: IProps) {
    const [value, setValue] = useState(text);

    return (
        <div
            className={'note'}
            onClick={() => onStartEdit(id)}
        >
            {isEdit && (
                <textarea
                    className={'note__textarea'}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={() => {
                        if (value !== text) {
                            onFinishEdit(id, value);
                        }
                    }}
                />
            )}
            {!isEdit && (
                <div className={'note__text'}>{text}</div>
            )}
            <button
                className={'note__remove-button'}
                onClick={() => onRemove(id)}
            >
                REMOVE
            </button>
        </div>
    );
}

export default Note;
