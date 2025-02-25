import Months from './Months';

type Logs = {
    id: string;
    itemId: string;
    itemName: string;
    change: string;
    time: string;
    month: Months;
    type: 'increase' | 'decrease';
};

export default Logs;
