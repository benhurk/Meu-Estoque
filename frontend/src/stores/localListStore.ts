import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import ListItemType from '../types/ListItemTypes';

type ListState = {
    localItems: ListItemType[];
};

type ListActions = {
    addLocalItem: (item: ListItemType) => void;
    removeLocalItem: (id: string) => void;
    editLocalItem: (editedItem: ListItemType) => void;
    clearLocalList: () => void;
};

const useLocalListStore = create(
    persist<ListState & ListActions>(
        (set) => ({
            localItems: [],
            addLocalItem: (item) =>
                set((state) => ({ localItems: [...state.localItems, item] })),
            removeLocalItem: (id) =>
                set((state) => ({
                    localItems: state.localItems.filter(
                        (item) => item.id !== id
                    ),
                })),
            editLocalItem: (editedItem) =>
                set((state) => ({
                    localItems: state.localItems.map((existingItem) =>
                        existingItem.id === editedItem.id
                            ? editedItem
                            : existingItem
                    ),
                })),
            clearLocalList: () =>
                set(() => ({
                    localItems: [],
                })),
        }),
        { name: 'list-storage' }
    )
);

export default useLocalListStore;
