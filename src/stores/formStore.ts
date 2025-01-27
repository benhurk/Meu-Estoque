import { create } from 'zustand';
import { FormMode } from '../types/FormTypes';
import ListItemType from '../types/ListItemTypes';

type FormState = {
    formMode: FormMode;
    targetItem: ListItemType;
    setFormMode: (mode: FormMode) => void;
    setTargetItem: (item: ListItemType) => void;
};

const useFormStore = create<FormState>((set) => ({
    formMode: 'add',
    targetItem: {
        id: -1,
        name: '',
        qtdType: 'number',
        numberOf: 'Unidades',
        quantity: 0,
        options: [],
        alertQuantity: 0,
        description: '',
    },
    setFormMode: (mode) => set({ formMode: mode }),
    setTargetItem: (item) => set({ targetItem: item }),
}));

export default useFormStore;
