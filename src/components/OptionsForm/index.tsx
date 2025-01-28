import { SetStateAction, useState } from 'react';

import AddOptionInput from '../AddOptionInput';
import Select from '../Select';

import mapOptions from '../../utils/mapOptions';
import optionsIsSaved from '../../utils/optionsIsSaved';
import useSavedOptionsStore from '../../stores/savedOptionsStore';

type Props = {
    options: string[];
    setOptions: React.Dispatch<SetStateAction<string[]>>;
};

export default function OptionsForm({ options, setOptions }: Props) {
    const [mode, setMode] = useState<'add' | 'select'>('select');

    const { savedOptions, removeSavedOptions } = useSavedOptionsStore();

    const handleChangeMode = (mode: 'add' | 'select') => {
        setMode(mode);
        setOptions([]);
    };

    const handleRemoveSavedOptions = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (optionsIsSaved(options, savedOptions)) {
            setOptions([]);
        }

        removeSavedOptions(e.currentTarget.dataset.option!.split(','));
    };

    return (
        <>
            <div className='mb-1'>
                <div className='form-check form-check-inline'>
                    <input
                        type='radio'
                        className='form-check-input'
                        id='radio-select'
                        name='mode'
                        checked={mode === 'select'}
                        value='select'
                        onChange={() => handleChangeMode('select')}
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
                        onChange={() => handleChangeMode('add')}
                    />
                    <label htmlFor='radio-add' className='form-check-label'>
                        Criar
                    </label>
                </div>
            </div>

            {mode === 'add' ? (
                <AddOptionInput options={options} setOptions={setOptions} />
            ) : (
                <Select
                    elementId='item-options'
                    options={mapOptions(savedOptions)}
                    change={(e) =>
                        setOptions(e.currentTarget.dataset.value!.split(','))
                    }
                    value={options.length > 0 ? options : 'Selecione as opções'}
                    removableOptions
                    removeFn={handleRemoveSavedOptions}
                    placeholderOption='Você não tem opções salvas'
                />
            )}
        </>
    );
}
