import { Dispatch, SetStateAction } from 'react';
import styles from './OptionsList.module.css';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
};

export default function OptionsList({ options, setOptions }: Props) {
    const removeOption = (toRemove: string) => {
        setOptions((prev) => prev.filter((items) => items != toRemove));
    };

    return (
        <>
            <ol>
                {options.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                        <div>
                            <span>{`${index + 1}. `}</span>
                            <span className='text-blue'>{item}</span>
                        </div>
                        <button
                            type='button'
                            className='btn-remove-item'
                            onClick={() => removeOption(item)}>
                            <i className='bi bi-x' />
                        </button>
                    </li>
                ))}
            </ol>
        </>
    );
}
