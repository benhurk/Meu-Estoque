import { ChangeEvent } from 'react';

import { QuantityType } from '../../types/ListItemType';
import removeZeroBeforeNumber from '../../utils/removeZero';

type Props = {
    size?: 'sm' | 'md';
    elementId?: string;
    type: QuantityType;
    value: number;
    options: string[];
    change: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function QuantityInput({
    size = 'sm',
    elementId,
    type,
    value,
    options,
    change,
}: Props) {
    if (type === 'number') {
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

    if (type === 'options') {
        return (
            <select
                className={`form-select form-select-${size}`}
                id={elementId}
                value={value}
                onChange={change}
                style={{ width: '12rem', maxWidth: '100%' }}>
                {options.length > 0 ? (
                    options.map((option, index) => (
                        <option key={option} value={index}>
                            {option}
                        </option>
                    ))
                ) : (
                    <option value='-1' disabled>
                        Você ainda não adicionou nenhuma opção
                    </option>
                )}
            </select>
        );
    }
}
