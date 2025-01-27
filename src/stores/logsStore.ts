import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Logs from '../types/Logs';

type LogsState = {
    logs: Logs[];
    addNewLog: (log: Logs) => void;
};

const useLogsStore = create<LogsState>()(
    persist(
        (set, get) => ({
            logs: [],
            addNewLog: (log) => {
                const { logs } = get();

                const logExists = logs.some(
                    (existingLog) =>
                        existingLog.date === log.date &&
                        existingLog.item === log.item &&
                        existingLog.diff === log.diff
                );

                if (!logExists) {
                    set({ logs: [...logs, log] });
                }
            },
        }),
        {
            name: 'logs-storage',
        }
    )
);

export default useLogsStore;
