import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItemType } from "../../models";

type ModalMode = 'add' | 'edit';

type modalState = {
    modalMode: ModalMode;
    targetId: number;
    formFields: {
        nameField: string;
        typeField: ListItemType["qtdType"];
        qtdField: number;
        alertField: number;
    }
}

const initialState: modalState = {
    modalMode: 'add',
    targetId: -1,
    formFields: {
        nameField: '',
        typeField: 'unity',
        qtdField: 0,
        alertField: 0
    }
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalMode: (state, action: PayloadAction<ModalMode>) => {
            state.modalMode = action.payload;
        },

        setTargetId: (state, action: PayloadAction<number>) => {
            state.targetId = action.payload;
        },

        setNameField: ({formFields}, action: PayloadAction<string>) => {
            formFields.nameField = action.payload;
        },

        setTypeField: ({formFields}, action: PayloadAction<ListItemType["qtdType"]>) => {
            formFields.typeField = action.payload;
        },

        setQtdField: ({formFields}, action: PayloadAction<number>) => {
            formFields.qtdField = action.payload;
        },

        setAlertField: ({formFields}, action: PayloadAction<number>) => {
            formFields.alertField = action.payload;
        },

        resetModal: (state) => {
            state.formFields = initialState.formFields;
        }
    }
});

export const { resetModal, setModalMode, setTargetId, setNameField, setQtdField, setTypeField, setAlertField } = modalSlice.actions;
export default modalSlice.reducer;