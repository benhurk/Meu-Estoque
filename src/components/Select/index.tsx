import { useState } from 'react';

import styles from './Select.module.css';
import SelectOptions from '../../types/SelectOptions';

type Props = {
    elementId: string;
    options: SelectOptions;
    change: (e: React.MouseEvent<HTMLElement>) => void;
    value: string | string[];
    emptyOption?: string;
    placeholderOption?: string;
    removableOptions?: boolean;
    removeFn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Select({
    elementId,
    options,
    change,
    value,
    emptyOption,
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
        if (e.currentTarget && !e.currentTarget.contains(e.relatedTarget)) {
            setOpen(false);
        }
    };

    const handleOptionClick = (e: React.MouseEvent<HTMLElement>) => {
        change(e);
        setOpen(false);
    };

    return (
        <div
            id={elementId}
            className={styles.wraper}
            tabIndex={0}
            onBlur={handleBlur}>
            <div
                className={`input ${styles.selectInput}`}
                tabIndex={0}
                onClick={toggle}>
                <span className='user-select-none text-nowrap'>
                    {value.length > 0 ? formatedOption(value) : ''}
                </span>
                <i className='dropdown-icon bi bi-chevron-down' />
            </div>

            {open && (
                <div
                    className={styles.options}
                    onClick={(e) => e.stopPropagation()}>
                    {emptyOption && (
                        <div
                            className={styles.item}
                            data-value={null}
                            onClick={change}>
                            {emptyOption}
                        </div>
                    )}
                    {options.length > 0 ? (
                        options.map((option, index) => (
                            <div
                                key={index}
                                className={styles.item}
                                data-value={option.value}
                                onClick={(e) => handleOptionClick(e)}>
                                <div>{formatedOption(option.label)}</div>
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
                        <div className={styles.placeholderItem}>
                            {placeholderOption}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
