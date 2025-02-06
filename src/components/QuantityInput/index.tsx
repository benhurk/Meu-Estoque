import { ChangeEvent } from 'react';

import styles from './QuantityInput.module.css';

import removeZeroBeforeNumber from '../../utils/removeZero';
import abbreviateNumberOf from '../../utils/abbreviateNumberOf';
import { NumberOf } from '../../types/ListItemTypes';

type Props = {
    size?: 'sm' | 'md';
    elementId: string;
    value: number;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
    unityOfMeasurement: NumberOf;
};

export default function QuantityInput({
    elementId,
    value,
    change,
    unityOfMeasurement,
}: Props) {
    return (
        <>
            <input
                className='input'
                id={elementId}
                type='number'
                min={0}
                value={removeZeroBeforeNumber(String(value))}
                onChange={change}
            />
            <small className={styles.itemUnityType}>
                {abbreviateNumberOf(unityOfMeasurement)}
            </small>
        </>
    );
}
