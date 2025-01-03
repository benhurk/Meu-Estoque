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

    return (
        <form>
            <label htmlFor='item-options' className='mb-1 d-block'>
                Adicionar opções:
            </label>
            <div className='d-flex'>
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
        </form>
    );
}
