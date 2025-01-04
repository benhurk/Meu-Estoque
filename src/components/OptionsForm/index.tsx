import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
};

export default function OptionsForm({ options, setOptions }: Props) {
    const [option, setOption] = useState<string>('');
    const [error, setError] = useState<string>('');

    const submitOption = (e: FormEvent<HTMLButtonElement>, value: string) => {
        e.preventDefault();

        if (!options.some((item) => item === value)) {
            setOptions((prev) => [...prev, value]);
            if (error) setError('');
        } else {
            setError('Essa opção já existe');
        }

        setOption('');
    };

    const removeOption = (toRemove: string) => {
        setOptions((prev) => prev.filter((items) => items != toRemove));
    };

    return (
        <>
            <div className='d-flex mb-1'>
                <input
                    id='item-options'
                    className='form-control'
                    type='text'
                    placeholder={error ? error : `Ex: Pouco / Bastante`}
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                />
                <button
                    type='submit'
                    className='btn btn-dark'
                    onClick={(e) => submitOption(e, option)}>
                    <i className='bi bi-plus' />
                </button>
            </div>

            {options.length > 0 && (
                <ol>
                    {options.map((item, index) => (
                        <li key={index}>
                            <span className='text-primary'>{item}</span>
                            <button
                                type='button'
                                className='ms-1 btn btn-sm'
                                onClick={() => removeOption(item)}>
                                <i className='bi bi-x' />
                            </button>
                        </li>
                    ))}
                </ol>
            )}
        </>
    );
}
