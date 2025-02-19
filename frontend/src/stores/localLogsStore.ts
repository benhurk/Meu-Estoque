import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Logs from '../types/Logs';

type LogsState = {
    localLogs: Logs[];
    addNewLocalLog: (log: Omit<Logs, 'id' | 'date'>) => void;
    removeLocalLog: (id: string) => void;
    clearLocalLogs: () => void;
};

const useLocalLogsStore = create<LogsState>()(
    persist(
        (set) => ({
            localLogs: [],
            addNewLocalLog: (log) => {
                const now = new Date();
                const date = now.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                });
                const time = now.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                });

                set((state) => ({
                    localLogs: [
                        ...state.localLogs,
                        {
                            id: crypto.randomUUID(),
                            date: `${date} - ${time}`,
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

            clearLocalLogs: () => {
                set(() => ({
                    localLogs: [],
                }));
            },
        }),
        {
            name: 'logs-storage',
        }
    )
);

export default useLocalLogsStore;
