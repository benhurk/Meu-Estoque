import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import ListItemType from '../types/ListItemTypes';

type ListState = {
    items: ListItemType[];
};

type ListActions = {
    addItem: (item: ListItemType) => void;
    removeItem: (id: number) => void;
    editItem: (item: ListItemType) => void;
    clearList: () => void;
};

const useListStore = create(
    persist<ListState & ListActions>(
        (set) => ({
            items: [],
            addItem: (item) =>
                set((state) => ({ items: [...state.items, item] })),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items
                        .filter((item) => item.id !== id)
                        .map((item) => {
                            if (item.id > id) {
                                return { ...item, id: item.id - 1 };
                            }
                            return item;
                        }),
                })),
            editItem: (item) =>
                set((state) => ({
                    items: state.items.map((existingItem) =>
                        existingItem.id === item.id ? item : existingItem
                    ),
                })),
            clearList: () =>
                set(() => ({
                    items: [],
                })),
        }),
        { name: 'list-storage' }
    )
);

export default useListStore;
