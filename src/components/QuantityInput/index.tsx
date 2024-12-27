import { ChangeEvent } from "react";

import { Quantity } from "../../types/ListItem";
import removeZeroBeforeNumber from "../../utils/removeZero";

type Props = {
    size?: 'sm' | 'md';
    type: Quantity;
    value: number;
    change: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function QuantityInput({size = 'sm', type, value, change}: Props) {
    if (type === 'unity') {
        return (
            <>
                <input className={`form-control form-control-${size} d-inline-block me-1`} style={{width: '5rem'}} type='number' min={0} 
                        value={removeZeroBeforeNumber(String(value))} onChange={change} />

                <span className='text-dark'>un.</span>
            </>
        )
    }

    if (type === 'abstract') {
        return (
            <select className={`w-50 form-select form-select-${size}`} value={value} onChange={change}>
                <option value='0'>Acabou</option>
                <option value='1'>Pouco</option>
                <option value='2'>Suficiente</option>
                <option value='3'>Bastante</option>
            </select>
        )
    }
}