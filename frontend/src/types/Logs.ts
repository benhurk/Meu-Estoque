import Months from './Months';

type Logs = {
    id: string;
    itemId: string;
    itemName: string;
    change: string;
    time: string;
    month: Months;
    year: number;
    type: 'increase' | 'decrease';
};

export default Logs;
