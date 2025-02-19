import { create } from 'zustand';

import ListItemType from '../types/ListItemTypes';
import api from '../api';
import Logs from '../types/Logs';

type ListState = {
    userItems: ListItemType[];
    userLogs: Logs[];
};

type ListActions = {
    setUserItems: (data: ListItemType[]) => void;
    addUserItem: (newItem: ListItemType) => void;
    editUserItem: (editedItem: ListItemType) => void;
    removeUserItem: (id: string) => void;
    removeSelectedUserItems: (ids: string[]) => void;
    clearUserList: () => void;
};

const useUserDataStore = create<ListState & ListActions>((set) => ({
    userItems: [],
    userLogs: [],

    setUserItems: (data) => {
        set(() => ({
            userItems: data,
        }));
    },
    addUserItem: (newItem) => {
        set((state) => ({
            userItems: [...state.userItems, newItem],
        }));
    },
    editUserItem: (editedItem) => {
        set((state) => ({
            userItems: state.userItems.map((item) =>
                item.id === editedItem.id ? editedItem : item
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
    removeSelectedUserItems: async (ids) => {
        const res = await api.delete('/items/x', { data: { ids } });
        if (res.status === 200) {
            set((state) => ({
                userItems: state.userItems.filter(
                    (item) => !ids.includes(item.id)
                ),
            }));
        }
    },
    clearUserList: async () => {
        const res = await api.delete('/items/');
        if (res.status === 200) {
            set(() => ({
                userItems: [],
            }));
        }
    },
}));

export default useUserDataStore;
