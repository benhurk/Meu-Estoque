import { ChangeEvent } from 'react';

import removeZeroBeforeNumber from '../../utils/removeZero';

type Props = {
    size?: 'sm' | 'md';
    elementId: string;
    value: number;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function QuantityInput({
    size = 'sm',
    elementId,
    value,
    change,
}: Props) {
    return (
        <>
            <input
                className={`form-control form-control-${size} d-inline-block me-1`}
                id={elementId}
                style={{ width: '5rem' }}
                type='number'
                min={0}
                value={removeZeroBeforeNumber(String(value))}
                onChange={change}
            />

            <span className='text-dark'>un.</span>
        </>
    );
}
