import {
    configureStore,
} from '@reduxjs/toolkit';

import notesReducer, {
    ISliceState,
} from '../features/notes/notesSlice';

export interface RootState {
    notes: ISliceState;
}

const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;