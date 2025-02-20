import months from '../consts/months';
import Logs from '../types/Logs';
import Months from '../types/Months';

export default function filterLogs(
    logs: Logs[],
    search: string,
    month: Months | undefined
) {
    const monthNumber = (months.findIndex((item) => item === month) + 1)
        .toString()
        .padStart(2, '0');

    const searchedLogs = logs.filter((log) => {
        if (month) {
            return (
                log.itemName.toLowerCase().includes(search.toLowerCase()) &&
                log.time.split(', ')[0].split('/')[1] === monthNumber
            );
        } else return log.itemName.toLowerCase().includes(search.toLowerCase());
    });

    return searchedLogs;
}
