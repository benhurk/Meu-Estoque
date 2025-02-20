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
    addUserItem: (newItem: Omit<ListItemType, 'id'>) => void;
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
    addUserItem: async (newItem) => {
        try {
            const res = await api.post('/items', newItem);
            set((state) => ({
                userItems: [
                    ...state.userItems,
                    keysToCamelCase(res.data.newItem),
                ],
            }));
        } catch {
            console.log('Falha ao adicionar um novo item, tente novamente.');
        }
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
        const res = await api.delete(`/items/${id}`);
        if (res.status === 200) {
            set((state) => ({
                userItems: state.userItems.filter((item) => item.id !== id),
                userLogs: state.userLogs.filter(
                    (log) => log.itemName != res.data.removedItem.name
                ),
            }));
        }
    },
    removeUserLog: async (id) => {
        set((state) => ({
            userLogs: state.userLogs.filter((log) => log.id != id),
        }));

        await api.delete(`/logs/${id}`);
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
