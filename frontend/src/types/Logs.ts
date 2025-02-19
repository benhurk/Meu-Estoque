type Logs = {
    id: string;
    itemName: string;
    change: string;
    time: string;
    type: 'increase' | 'decrease' | 'neutral';
};

export default Logs;
