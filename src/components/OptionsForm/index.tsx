import { Dispatch, SetStateAction, useState } from 'react';

import FormGroup from '../FormGroup';
import AddOptionInput from '../AddOptionInput';

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

    return (
        <FormGroup elementId='item-options' labelText='Opções:'>
            <div className='mb-1'>
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
                        }}
                    />
                    <label htmlFor='radio-add' className='form-check-label'>
                        Criar
                    </label>
                </div>
            </div>

            {mode === 'add' ? (
                <AddOptionInput options={options} setOptions={setOptions} />
            ) : (
                <select
                    className='form-select'
                    id='item-options'
                    value={
                        options
                            ? savedOptions.findIndex((item) => item === options)
                            : '-1'
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
        </FormGroup>
    );
}
