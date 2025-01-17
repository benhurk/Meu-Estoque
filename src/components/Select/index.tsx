import { useState } from 'react';

import styles from './Select.module.css';
import SelectOptions from '../../types/SelectOptions';

type Props = {
    elementId: string;
    options: SelectOptions;
    change: (e: React.MouseEvent<HTMLElement>) => void;
    value: string | string[];
    placeholderOption?: string;
    removableOptions?: boolean;
    removeFn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Select({
    elementId,
    options,
    change,
    value,
    placeholderOption,
    removableOptions = false,
    removeFn,
}: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const formatedOption = (option: string | string[]) => {
        if (typeof option === 'string') {
            return option;
        } else {
            return option.join(' / ');
        }
    };

    const toggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(e.target as HTMLElement).classList.contains('btn-remove-item')) {
            setOpen(!open);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (!e.relatedTarget?.classList.contains('btn-remove-item')) {
            setOpen(false);
        }
    };

    return (
        <div
            className='position-relative form-select'
            id={elementId}
            tabIndex={0}
            onClick={toggle}
            onBlur={handleBlur}>
            <div className='overflow-hidden'>
                <span className='user-select-none text-nowrap'>
                    {value.length > 0 ? formatedOption(value) : ''}
                </span>
            </div>

            {open && (
                <div className='position-absolute top-100 start-0 w-100 p-1 d-flex flex-column bg-body border border-dark-subtle rounded shadow-sm z-3'>
                    {options.length > 0 ? (
                        options.map((option, index) => (
                            <div
                                key={index}
                                className={`d-flex justify-content-between align-items-center px-1 overflow-hidden ${styles.item}`}>
                                <div
                                    className='w-100 py-2'
                                    data-value={option.value}
                                    onClick={change}>
                                    <span className='text-nowrap'>
                                        {formatedOption(option.label)}
                                    </span>
                                </div>
                                {removableOptions && removeFn && (
                                    <button
                                        type='button'
                                        onClick={removeFn}
                                        data-option={option.label}
                                        className='btn-remove-item'>
                                        <i className='bi bi-x' />
                                    </button>
                                )}
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
