import { useState } from 'react';

import styles from './Select.module.css';
import SelectOptions from '../../types/SelectOptions';

type Props = {
    elementId: string;
    options: SelectOptions;
    change: (e: React.MouseEvent<HTMLElement>) => void;
    value: string | string[];
    placeholderOption?: string;
};

export default function Select({
    elementId,
    options,
    change,
    value,
    placeholderOption,
}: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const formatedOption = (option: string | string[]) => {
        if (typeof option === 'string') {
            return option;
        } else {
            return option.join(' / ');
        }
    };

    return (
        <div
            className='position-relative form-select'
            id={elementId}
            tabIndex={0}
            onClick={() => setOpen(!open)}
            onBlur={() => setOpen(false)}>
            <div className='overflow-hidden'>
                <span className='user-select-none text-nowrap'>
                    {value.length > 0 ? formatedOption(value) : ''}
                </span>
            </div>

            {open && (
                <div className='position-absolute top-100 start-0 w-100 p-1 d-flex flex-column gap-2 bg-body border border-dark-subtle rounded shadow-sm z-3'>
                    {options.length > 0 ? (
                        options.map((option, index) => (
                            <div
                                key={index}
                                className={`p-1 overflow-hidden ${styles.item}`}
                                data-value={option.value}
                                onClick={change}>
                                <span className='text-nowrap'>
                                    {formatedOption(option.label)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className='p-1 overflow-hidden'>
                            <span className='text-nowrap text-secondary user-select-none'>
                                {placeholderOption}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
