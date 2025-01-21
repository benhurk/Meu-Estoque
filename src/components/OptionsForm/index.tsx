import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { removeSavedOptions } from '../../store/reducers/savedOptions';

import AddOptionInput from '../AddOptionInput';
import Select from '../Select';

import mapOptions from '../../utils/mapOptions';
import optionsIsSaved from '../../utils/optionsIsSaved';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
};

export default function OptionsForm({ options, setOptions }: Props) {
    const dispatch = useDispatch();

    const [mode, setMode] = useState<'add' | 'select'>('select');

    const { savedOptions } = useSelector(
        (state: RootState) => state.savedOptions
    );

    const handleRemoveSavedOptions = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (optionsIsSaved(options, savedOptions)) {
            setOptions([]);
        }

        dispatch(
            removeSavedOptions(e.currentTarget.dataset.option!.split(','))
        );
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
                        onChange={() => {
                            setMode('select');
                            setOptions([]);
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
