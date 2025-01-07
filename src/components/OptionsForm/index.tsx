import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import OptionsList from '../OptionsList';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
    savedOptions: string[][];
};

export default function OptionsForm({
    options,
    setOptions,
    savedOptions,
}: Props) {
    const [mode, setMode] = useState<'add' | 'select'>('select');
    const [newOption, setNewOption] = useState<string>('');
    const [error, setError] = useState<string>('');

    const submitOption = (e: FormEvent<HTMLButtonElement>, value: string) => {
        e.preventDefault();

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
        <div className='mb-3'>
            <div className='form-group mb-1'>
                <div className='form-check form-check-inline'>
                    <input
                        type='radio'
                        className='form-check-input'
                        id='radio-select'
                        name='mode'
                        checked={mode === 'select'}
                        value='select'
                        onChange={() => {
                            setMode('select');
                            setOptions(savedOptions[0]);
                        }}
                    />
                    <label htmlFor='radio-select' className='form-check-label'>
                        Selecionar
                    </label>
                </div>
                <div className='form-check form-check-inline'>
                    <input
                        type='radio'
                        className='form-check-input'
                        id='radio-add'
                        name='mode'
                        checked={mode === 'add'}
                        value='add'
                        onChange={() => {
                            setMode('add');
                            setOptions([]);
                        }}
                    />
                    <label htmlFor='radio-add' className='form-check-label'>
                        Criar
                    </label>
                </div>
            </div>

            {mode === 'add' ? (
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
                            type='submit'
                            className='btn btn-dark'
                            onClick={(e) => submitOption(e, newOption)}>
                            <i className='bi bi-plus' />
                        </button>
                    </div>
                    {options.length > 0 && (
                        <OptionsList
                            options={options}
                            setOptions={setOptions}
                        />
                    )}
                </>
            ) : (
                <select
                    className='form-select'
                    defaultValue={
                        options.length === 0
                            ? '-1'
                            : savedOptions.findIndex((item) => item === options)
                    }
                    onChange={(e) =>
                        setOptions(savedOptions[Number(e.target.value)])
                    }>
                    <option value='-1' disabled hidden>
                        Selecione as opções
                    </option>

                    {savedOptions.map((option, index) => (
                        <option key={index} value={index}>
                            {option.join(' / ')}
                        </option>
                    ))}

                    {savedOptions.length < 2 && (
                        <option value='-2' disabled>
                            Crie suas próprias opções no menu 'Criar'
                        </option>
                    )}
                </select>
            )}
        </div>
    );
}
