import { Dispatch, SetStateAction, useState } from 'react';

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
            <div className='mb-1 input-group'>
                <input
                    id='item-options'
                    className='form-control'
                    type='text'
                    placeholder={error ? error : 'Nova opção'}
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                />
                <button
                    type='button'
                    className='btn btn-dark'
                    onClick={() => submitOption(newOption)}>
                    <i className='bi bi-plus' />
                </button>
            </div>
            {options.length > 0 && (
                <OptionsList options={options} setOptions={setOptions} />
            )}
        </>
    );
}
