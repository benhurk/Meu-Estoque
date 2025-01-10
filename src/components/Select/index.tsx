import { useEffect, useMemo, useState } from 'react';

import styles from './Select.module.css';

type Props = {
    elementId: string;
    options: string[] | string[][];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    change: Function;
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
    const [selected, setSelected] = useState<string | string[]>('');

    useEffect(() => {
        change(selected);
    }, [change, selected]);

    useMemo(() => {
        setSelected(value);
    }, [value]);

    const formatedOption = (option: string | string[]) => {
        if (typeof option === 'string') {
            return;
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
                    {selected.length > 0
                        ? formatedOption(selected)
                        : 'Selecione as opções'}
                </span>
            </div>

            {open && (
                <div className='position-absolute top-100 start-0 w-100 p-1 d-flex flex-column gap-2 bg-body border border-dark-subtle rounded shadow-sm'>
                    {options.length ? (
                        options.map((option, index) => (
                            <div
                                key={index}
                                className={`p-1 overflow-hidden ${styles.item}`}
                                onClick={() => setSelected(option)}>
                                <span className='text-nowrap'>
                                    {formatedOption(option)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className='p-1 overflow-hidden'>
                            <span className='text-nowrap text-secondary'>
                                {placeholderOption}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
