import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Logs from '../types/Logs';

type LogsState = {
    logs: Logs[];
    addNewLog: (log: Omit<Logs, 'id' | 'date'>) => void;
    removeLog: (id: string) => void;
    clearLogs: () => void;
};

const useLogsStore = create<LogsState>()(
    persist(
        (set) => ({
            logs: [],
            addNewLog: (log) => {
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
                    logs: [
                        ...state.logs,
                        {
                            id: crypto.randomUUID(),
                            date: `${date} - ${time}`,
                            ...log,
                        },
                    ],
                }));
            },

            removeLog: (id) => {
                set((state) => ({
                    logs: state.logs.filter((log) => log.id != id),
                }));
            },

            clearLogs: () => {
                set(() => ({
                    logs: [],
                }));
            },
        }),
        {
            name: 'logs-storage',
        }
    )
);

export default useLogsStore;
