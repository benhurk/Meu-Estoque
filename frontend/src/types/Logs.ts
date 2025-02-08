type Logs = {
    id: string;
    date: string;
    item: string;
    diff: string;
    diffType: 'increase' | 'decrease' | null;
};

export default Logs;
