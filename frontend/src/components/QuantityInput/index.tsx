import { ChangeEvent } from 'react';

import styles from './QuantityInput.module.css';

import removeZeroBeforeNumber from '../../utils/removeZero';
import { UnitsOfMeasurement } from '../../types/ListItemTypes';
import abbreviateUnitOfMeasurement from '../../utils/abbreviateUnitOfMeasurement';

type Props = {
    elementId: string;
    value: number;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
    unitOfMeasurement: UnitsOfMeasurement;
};

export default function QuantityInput({
    elementId,
    value,
    change,
    unitOfMeasurement,
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
                {abbreviateUnitOfMeasurement(unitOfMeasurement)}
            </small>
        </>
    );
}
