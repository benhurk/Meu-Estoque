import { create } from 'zustand';

import api from '../api';

import ListItemType from '../types/ListItemTypes';
import Logs from '../types/Logs';
import keysToCamelCase from '../utils/snakeToCamel';
import handleApiErrors from '../utils/handleApiErrors';
import { triggerErrorToast } from '../utils/triggerToast';

type ListState = {
    userItems: ListItemType[];
    userLogs: Logs[];
};

type ListActions = {
    setUserItems: (data: ListItemType[]) => void;
    setUserLogs: (data: Logs[]) => void;
    addUserItem: (newItem: ListItemType) => void;
    editUserItem: (editedItem: ListItemType) => void;
    removeUserItems: (ids: string[]) => void;
    removeUserLog: (id: string) => void;
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
    removeUserItems: async (ids) => {
        set((state) => ({
            userItems: state.userItems.filter((item) => !ids.includes(item.id)),
        }));

        try {
            await api.delete('/items', { data: { ids } });
        } catch (error) {
            handleApiErrors(error, triggerErrorToast);

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
            handleApiErrors(error, triggerErrorToast);

            set((state) => ({
                userLogs: [...state.userLogs],
            }));
        }
    },
    clearUserList: () => {
        set(() => ({
            userItems: [],
        }));
    },
}));

export default useUserDataStore;
