import { create } from 'zustand';

import ListItemType from '../types/ListItemTypes';
import api from '../api';
import Logs from '../types/Logs';
import keysToCamelCase from '../utils/snakeToCamel';

type ListState = {
    userItems: ListItemType[];
    userLogs: Logs[];
};

type ListActions = {
    setUserItems: (data: ListItemType[]) => void;
    setUserLogs: (data: Logs[]) => void;
    addUserItem: (newItem: ListItemType) => void;
    editUserItem: (editedItem: ListItemType) => void;
    removeUserItem: (id: string) => void;
    removeUserLog: (id: string) => void;
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
    setUserLogs: (data) => {
        set(() => ({
            userLogs: data,
        }));
    },
    addUserItem: (newItem) => {
        set((state) => ({
            userItems: [...state.userItems, keysToCamelCase(newItem)],
        }));
    },
    editUserItem: (editedItem) => {
        const edited = keysToCamelCase(editedItem);
        set((state) => ({
            userItems: state.userItems.map((item) =>
                item.id === edited.id ? edited : item
            ),
        }));
    },
    removeUserItem: async (id) => {
        set((state) => ({
            userItems: state.userItems.filter((item) => item.id !== id),
        }));

        try {
            await api.delete(`/items/${id}`);
        } catch (error) {
            console.error('Failed to remove item from the server:', error);

            set((state) => ({
                userItems: [...state.userItems],
            }));
        }
    },
    removeUserLog: async (id) => {
        set((state) => ({
            userLogs: state.userLogs.filter((log) => log.id != id),
        }));

        try {
            await api.delete(`/logs/${id}`);
        } catch (error) {
            console.error('Failed to remove log from the server:', error);

            set((state) => ({
                userLogs: [...state.userLogs],
            }));
        }
    },
    removeSelectedUserItems: (ids) => {
        set((state) => ({
            userItems: state.userItems.filter((item) => !ids.includes(item.id)),
        }));
    },
    clearUserList: () => {
        set(() => ({
            userItems: [],
        }));
    },
}));

export default useUserDataStore;
