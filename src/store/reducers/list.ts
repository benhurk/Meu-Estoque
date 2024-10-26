import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItemType } from "../../models";

type listState = {
    items: ListItemType[];
}

const initialState: listState = {
    items: [
        {
            id: 0,
            name: 'teste',
            qtdType: 'unity'
        },
        {
            id: 1,
            name: 'teste 2',
            qtdType: 'abstract'
        }
    ]
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ListItemType>) => {
            state.items.push(action.payload);
        },

        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        }
    }
});

export const { addItem, removeItem } = listSlice.actions;
export default listSlice.reducer;