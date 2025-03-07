import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import ListItemType from '../types/ListItemTypes';
import Logs from '../types/Logs';

type ListState = {
    localItems: ListItemType[];
    localLogs: Logs[];
};

type ListActions = {
    addLocalItem: (item: ListItemType) => void;
    removeLocalItem: (id: string) => void;
    editLocalItem: (editedItem: ListItemType) => void;
    addLocalLog: (log: Omit<Logs, 'id'>) => void;
    removeLocalLog: (id: string) => void;
    clearLocalList: () => void;
};

const useLocalDataStore = create(
    persist<ListState & ListActions>(
        (set) => ({
            localItems: [],
            localLogs: [],
            addLocalItem: (item) => {
                set((state) => ({
                    localItems: [...state.localItems, item],
                }));
            },
            removeLocalItem: (id) =>
                set((state) => ({
                    localItems: state.localItems.filter(
                        (item) => item.id !== id
                    ),
                    localLogs: state.localLogs.filter(
                        (log) => log.itemId !== id
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
            addLocalLog: (log) => {
                set((state) => ({
                    localLogs: [
                        ...state.localLogs,
                        {
                            id: crypto.randomUUID(),
                            ...log,
                        },
                    ],
                }));
            },
            removeLocalLog: (id) => {
                set((state) => ({
                    localLogs: state.localLogs.filter((log) => log.id != id),
                }));
            },
            clearLocalList: () =>
                set(() => ({
                    localItems: [],
                    localLogs: [],
                })),
        }),
        { name: 'local-data-storage' }
    )
);

export default useLocalDataStore;
