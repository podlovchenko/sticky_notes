import {
    INote,
    NoteId,
} from '../../types/notes';

import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

export interface ISliceState {
    items: Record<NoteId, INote>;
}

const initialState: ISliceState = {
    items: {},
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<INote>) => {
            state.items[action.payload.id] = action.payload;
        },
        edit: (state, action: PayloadAction<INote>) => {
            state.items[action.payload.id] = {
                ...state.items[action.payload.id],
                ...action.payload,
            };
        },
        remove: (state, action: PayloadAction<NoteId>) => {
            delete state.items[action.payload];
        },
    },
});

export const {
    add,
    edit,
    remove,
} = notesSlice.actions;

export default notesSlice.reducer;