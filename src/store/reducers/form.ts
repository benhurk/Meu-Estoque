import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormMode } from "../../types/ItemForm";

type formState = {
    formMode: FormMode;
    targetId: number;
}

const initialState: formState = {
    formMode: 'add',
    targetId: -1,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormMode: (state, action: PayloadAction<FormMode>) => {
            state.formMode = action.payload;
        },

        setTargetId: (state, action: PayloadAction<number>) => {
            state.targetId = action.payload;
        }
    }
});

export const { setFormMode, setTargetId } = formSlice.actions;
export default formSlice.reducer;