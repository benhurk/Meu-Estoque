import { create } from 'zustand';

import ListItemType from '../types/ListItemTypes';

type ListState = {
    userItems: ListItemType[];
};

type ListActions = {
    setListData: (data: ListItemType[]) => void;
    addUserItem: (newItem: ListItemType) => void;
    editUserItem: (editedItem: ListItemType) => void;
    removeUserItem: (id: string) => void;
};

const useListStore = create<ListState & ListActions>((set) => ({
    userItems: [],
    setListData: (data) => {
        set(() => ({
            userItems: data,
        }));
    },
    addUserItem: (newItem) => {
        set((state) => ({ userItems: [...state.userItems, newItem] }));
    },
    editUserItem: (editedItem) => {
        set((state) => ({
            userItems: state.userItems.map((item) =>
                item.id === editedItem.id ? editedItem : item
            ),
        }));
    },
    removeUserItem: (id) => {
        set((state) => ({
            userItems: state.userItems.filter((item) => item.id !== id),
        }));
    },
}));

export default useListStore;
