import { Dispatch, SetStateAction, useState } from 'react';

import styles from './AddOptionInput.module.css';

import OptionsList from '../OptionsList';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
};

export default function AddOptionInput({ options, setOptions }: Props) {
    const [newOption, setNewOption] = useState<string>('');
    const [error, setError] = useState<string>('');

    const submitOption = (value: string) => {
        if (!options.some((item) => item === value) && value != '') {
            setOptions((prev) => [...prev, value]);
            if (error) setError('');
        } else if (value === '') {
            setError('Dê um nome para a opção');
        } else {
            setError('Essa opção já existe');
        }

        setNewOption('');
    };

    return (
        <>
            <div className={styles.inputWraper}>
                <input
                    id='item-options'
                    className='input'
                    type='text'
                    placeholder={error ? error : 'Nova opção'}
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                />
                <button
                    type='button'
                    className='btn btn-dark bi bi-plus-lg'
                    onClick={() => submitOption(newOption)}
                />
            </div>
            {options.length > 0 && (
                <OptionsList options={options} setOptions={setOptions} />
            )}
        </>
    );
}
