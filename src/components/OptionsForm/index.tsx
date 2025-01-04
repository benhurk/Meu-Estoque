import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
};

export default function OptionsForm({ options, setOptions }: Props) {
    const [mode, setMode] = useState<'add' | 'select'>('select');
    const [savedOptions, setSavedOptions] = useState<string[][]>([
        ['Acabou', 'Pouco', 'Suficiente', 'Bastante'],
    ]);
    const [newOption, setNewOption] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setOptions([]);
    }, [mode, setOptions]);

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

    const removeOption = (toRemove: string) => {
        setOptions((prev) => prev.filter((items) => items != toRemove));
    };

    const saveOptions = (options: string[]) => {
        if (!savedOptions.some((saved) => saved === options)) {
            setSavedOptions((prev) => [...prev, options]);
        }
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
                        onChange={() => setMode('select')}
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
                        <>
                            <ol className='mb-1'>
                                {options.map((item, index) => (
                                    <li key={index}>
                                        <span className='text-primary'>
                                            {item}
                                        </span>
                                        <button
                                            type='button'
                                            className='ms-1 btn btn-sm'
                                            onClick={() => removeOption(item)}>
                                            <i className='bi bi-x' />
                                        </button>
                                    </li>
                                ))}
                            </ol>
                            <button
                                type='button'
                                className='btn btn-sm btn-primary'
                                onClick={() => saveOptions(options)}>
                                Salvar opções
                            </button>
                        </>
                    )}
                </>
            ) : (
                <select
                    className='form-select'
                    defaultValue=''
                    onChange={(e) =>
                        setOptions(savedOptions[Number(e.target.value)])
                    }>
                    <option value='' disabled hidden>
                        Selecione as opções
                    </option>
                    {savedOptions.map((option, index) => (
                        <option key={index} value={index}>
                            {option.join(' / ')}
                        </option>
                    ))}
                    {savedOptions.length < 2 && (
                        <option value='' disabled>
                            Crie suas próprias opções no menu 'Criar'
                        </option>
                    )}
                </select>
            )}
        </div>
    );
}
