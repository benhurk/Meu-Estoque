import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import ListItemType from '../types/ListItemTypes';

type ListState = {
    localItems: ListItemType[];
};

type ListActions = {
    addItem: (item: ListItemType) => void;
    removeItem: (id: string) => void;
    editItem: (item: ListItemType) => void;
    clearList: () => void;
};

const useLocalListStore = create(
    persist<ListState & ListActions>(
        (set) => ({
            localItems: [],
            addItem: (item) =>
                set((state) => ({ localItems: [...state.localItems, item] })),
            removeItem: (id) =>
                set((state) => ({
                    localItems: state.localItems.filter(
                        (item) => item.id !== id
                    ),
                })),
            editItem: (item) =>
                set((state) => ({
                    localItems: state.localItems.map((existingItem) =>
                        existingItem.id === item.id ? item : existingItem
                    ),
                })),
            clearList: () =>
                set(() => ({
                    localItems: [],
                })),
        }),
        { name: 'list-storage' }
    )
);

export default useLocalListStore;
