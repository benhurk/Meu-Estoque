import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Logs from '../../types/Logs';

type logsState = {
    logs: Logs[];
};

const initialState: logsState = {
    logs: [],
};

const logsSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        addNewLog: (state, action: PayloadAction<Logs>) => {
            state.logs.push(action.payload);
        },
    },
});

export const { addNewLog } = logsSlice.actions;
export default logsSlice.reducer;
