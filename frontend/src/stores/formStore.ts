import { create } from 'zustand';
import { ItemFormMode as FormMode } from '../types/ItemFormTypes';

type FormState = {
    formMode: FormMode;
    targetItemId: number | string;
    setFormMode: (mode: FormMode) => void;
    setTargetItem: (itemId: number | string) => void;
};

const useFormStore = create<FormState>((set) => ({
    formMode: 'add',
    targetItemId: '',
    setFormMode: (mode) => set({ formMode: mode }),
    setTargetItem: (itemId) => set({ targetItemId: itemId }),
}));

export default useFormStore;
