import { create } from 'zustand';

import ListItemType from '../types/ListItemTypes';
import api from '../api';
import keysToCamelCase from '../utils/snakeToCamel';

type ListState = {
    userItems: ListItemType[];
};

type ListActions = {
    setListData: (data: ListItemType[]) => void;
    addUserItem: (newItem: Omit<ListItemType, 'id'>) => void;
    editUserItem: (id: string, editedItem: Omit<ListItemType, 'id'>) => void;
    removeUserItem: (id: string) => void;
    clearUserList: () => void;
};

const useListStore = create<ListState & ListActions>((set) => ({
    userItems: [],

    setListData: (data) => {
        set(() => ({
            userItems: data,
        }));
    },
    addUserItem: async (newItem) => {
        const res = await api.post('/items', newItem);
        if (res.status === 201) {
            set((state) => ({
                userItems: [
                    ...state.userItems,
                    keysToCamelCase(res.data.newItem),
                ],
            }));
        }
    },
    editUserItem: (id, editedItem) => {
        set((state) => ({
            userItems: state.userItems.map((item) =>
                item.id === id ? { ...editedItem, id } : item
            ),
        }));
    },
    removeUserItem: async (id) => {
        const res = await api.delete(`/items/${id}`);
        if (res.status === 200) {
            set((state) => ({
                userItems: state.userItems.filter((item) => item.id !== id),
            }));
        }
    },
    clearUserList: () => {
        set(() => ({
            userItems: [],
        }));
    },
}));

export default useListStore;
