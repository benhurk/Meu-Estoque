import { ChangeEvent } from 'react';

import { Quantity } from '../../types/ListItem';
import removeZeroBeforeNumber from '../../utils/removeZero';

type Props = {
    size?: 'sm' | 'md';
    type: Quantity;
    value: number;
    options: string[];
    change: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function QuantityInput({
    size = 'sm',
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
                style={{ width: 'fit-content', minWidth: '50%' }}
                value={value}
                onChange={change}>
                {options.length > 0 ? (
                    options.map((option, index) => (
                        <option key={option} value={index}>
                            {option}
                        </option>
                    ))
                ) : (
                    <option value='' disabled>
                        Você ainda não adicionou nenhuma opção
                    </option>
                )}
            </select>
        );
    }
}
