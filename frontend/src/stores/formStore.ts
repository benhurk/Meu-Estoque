import { create } from 'zustand';
import { FormMode } from '../types/ItemFormTypes';

type FormState = {
    formMode: FormMode;
    targetItemId: string;
    setFormMode: (mode: FormMode) => void;
    setTargetItem: (itemId: string) => void;
};

const useFormStore = create<FormState>((set) => ({
    formMode: 'add',
    targetItemId: '',
    setFormMode: (mode) => set({ formMode: mode }),
    setTargetItem: (itemId) => set({ targetItemId: itemId }),
}));

export default useFormStore;
