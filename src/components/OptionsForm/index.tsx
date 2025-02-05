import { useState } from 'react';

import styles from './OptionsForm.module.css';

import AddOptionInput from '../AddOptionInput';
import Select from '../Select';

import mapOptions from '../../utils/mapOptions';
import optionsIsSaved from '../../utils/optionsIsSaved';
import useSavedOptionsStore from '../../stores/savedOptionsStore';

type Props = {
    options: string[];
    setOptions: (value: string[]) => void;
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
            <div className={styles.radiosArea}>
                <div className={styles.radioGroup}>
                    <input
                        type='radio'
                        id='radio-select'
                        name='mode'
                        checked={mode === 'select'}
                        value='select'
                        onChange={() => handleChangeMode('select')}
                    />
                    <label htmlFor='radio-select'>Selecionar</label>
                </div>
                <div className={styles.radioGroup}>
                    <input
                        type='radio'
                        id='radio-add'
                        name='mode'
                        checked={mode === 'add'}
                        value='add'
                        onChange={() => handleChangeMode('add')}
                    />
                    <label htmlFor='radio-add'>Criar</label>
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
