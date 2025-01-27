import months from '../const/months';
import Logs from '../types/Logs';
import Months from '../types/Months';

export default function filterLogs(logs: Logs[], month?: Months) {
    if (month) {
        return logs.filter((log) => {
            const monthNumber = (months.findIndex((item) => item === month) + 1)
                .toString()
                .padStart(2, '0');

            return log.date.split('/')[1] === monthNumber;
        });
    } else return logs;
}
