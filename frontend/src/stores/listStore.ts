import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import ListItemType from '../types/ListItemTypes';

type ListState = {
    items: ListItemType[];
};

type ListActions = {
    setListData: (data: ListItemType[]) => void;
    addItem: (item: ListItemType) => void;
    removeItem: (id: string) => void;
    editItem: (item: ListItemType) => void;
    clearList: () => void;
};

const useListStore = create(
    persist<ListState & ListActions>(
        (set) => ({
            items: [],
            setListData: (data) =>
                set(() => ({
                    items: data,
                })),
            addItem: (item) =>
                set((state) => ({ items: [...state.items, item] })),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
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
