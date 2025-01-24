import { useState } from 'react';

export type Logs = {
    date: string;
    item: string;
    diff: string;
};

const getAllDaysOfYear = (year: number) => {
    const days = [];

    for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(
                `${day.toString().padStart(2, '0')}/${month
                    .toString()
                    .padStart(2, '0')}`
            );
        }
    }

    return days;
};

const emptyLogs = () => {
    const year = new Date().getFullYear();
    const logs: Logs[] = [];
    getAllDaysOfYear(year).forEach((day) => {
        logs.push({
            date: day,
            item: '',
            diff: '',
        });
    });

    return logs;
};

export default function useLogs() {
    const [logs, setLogs] = useState<Logs[]>([]);

    return { logs, setLogs };
}
