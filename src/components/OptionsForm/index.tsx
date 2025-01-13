import { Dispatch, SetStateAction, useState } from 'react';

import FormGroup from '../FormGroup';
import AddOptionInput from '../AddOptionInput';
import Select from '../Select';
import mapOptions from '../../utils/mapOptions';
import optionsIsSaved from '../../utils/optionsIsSaved';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
    savedOptions: string[][];
    setSavedOptions: Dispatch<SetStateAction<string[][]>>;
};

export default function OptionsForm({
    options,
    setOptions,
    savedOptions,
    setSavedOptions,
}: Props) {
    const [mode, setMode] = useState<'add' | 'select'>('select');

    const removeSavedOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (optionsIsSaved(options, savedOptions)) {
            setOptions([]);
        }

        setSavedOptions(
            savedOptions.filter(
                (options) =>
                    !options.every(
                        (item, index) =>
                            item ===
                            (
                                e.target as HTMLButtonElement
                            ).dataset.option!.split(',')[index]
                    )
            )
        );
    };

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
                <AddOptionInput options={options} setOptions={setOptions} />
            ) : (
                <Select
                    elementId='item-options'
                    options={mapOptions(savedOptions)}
                    change={(e) =>
                        setOptions(
                            (e.target as HTMLElement).dataset.value!.split(',')
                        )
                    }
                    value={options.length > 0 ? options : 'Selecione uma opção'}
                    removableOptions
                    removeFn={removeSavedOptions}
                    placeholderOption='Você não tem opções salvas'
                />
            )}
        </FormGroup>
    );
}
