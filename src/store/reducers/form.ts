import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormMode } from '../../types/FormTypes';
import ListItemType from '../../types/ListItemType';

type formState = {
    formMode: FormMode;
    targetItem: ListItemType;
};

const initialState: formState = {
    formMode: 'add',
    targetItem: {
        id: -1,
        name: '',
        qtdType: 'number',
        quantity: 0,
        options: [],
        alertQuantity: 0,
    },
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormMode: (state, action: PayloadAction<FormMode>) => {
            state.formMode = action.payload;
        },

        setTargetItem: (state, action: PayloadAction<ListItemType>) => {
            state.targetItem = action.payload;
        },
    },
});

export const { setFormMode, setTargetItem } = formSlice.actions;
export default formSlice.reducer;
