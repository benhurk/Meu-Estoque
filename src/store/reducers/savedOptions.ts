import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type savedOptionsState = {
    savedOptions: string[][];
};

const initialState: savedOptionsState = {
    savedOptions: [['Acabou', 'Pouco', 'Suficiente', 'Bastante']],
};

const savedOptionsSlice = createSlice({
    name: 'savedOptions',
    initialState,
    reducers: {
        saveOptions: (state, action: PayloadAction<string[]>) => {
            state.savedOptions.push(action.payload);
        },

        removeSavedOptions: (state, action: PayloadAction<string[]>) => {
            state.savedOptions = state.savedOptions.filter(
                (opt) =>
                    opt.length === action.payload.length &&
                    opt.every((value, index) => value !== action.payload[index])
            );
        },
    },
});

export const { saveOptions, removeSavedOptions } = savedOptionsSlice.actions;
export default savedOptionsSlice.reducer;
