import { ChangeEvent } from 'react';

import removeZeroBeforeNumber from '../../utils/removeZero';

type Props = {
    size?: 'sm' | 'md';
    elementId: string;
    value: number;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function QuantityInput({ elementId, value, change }: Props) {
    return (
        <input
            className='input'
            id={elementId}
            type='number'
            min={0}
            value={removeZeroBeforeNumber(String(value))}
            onChange={change}
        />
    );
}
