import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { addItem, editItem } from '../../store/reducers/list';

import mapOptions from '../../utils/mapOptions';
import itemFormInitialState from '../../const/itemFormState';

import { FormMode } from '../../types/FormTypes';
import ListItemType, { QuantityType } from '../../types/ListItemType';

import QuantityInput from '../QuantityInput';
import OptionsForm from '../OptionsForm';
import FormGroup from '../FormGroup';
import Select from '../Select';
import optionsIsSaved from '../../utils/optionsIsSaved';

const getSavedOptions = () =>
    JSON.parse(
        localStorage.getItem('saved-options') ||
            JSON.stringify([['Acabou', 'Pouco', 'Suficiente', 'Bastante']])
    );

export default function ItemForm() {
    const dispatch = useDispatch();

    const [fields, setFields] = useState(itemFormInitialState);
    const [options, setOptions] = useState<string[]>([]);
    const [savedOptions, setSavedOptions] = useState<string[][]>(
        getSavedOptions()
    );

    const listItems = useSelector((state: RootState) => state.list.items);
    const { formMode, targetItem } = useSelector(
        (state: RootState) => state.form
    );

    useEffect(() => {
        if (formMode === 'edit') {
            setFields({
                name: targetItem.name,
                qtdType: targetItem.qtdType,
                quantity: targetItem.quantity,
                alertQuantity: targetItem.alertQuantity,
                description: targetItem.description,
            });

            setOptions(targetItem.options);
        }

        if (formMode === 'add') {
            setFields(itemFormInitialState);
            setOptions([]);
        }
    }, [formMode, targetItem]);

    useEffect(() => {
        localStorage.setItem('saved-options', JSON.stringify(savedOptions));
    }, [savedOptions]);

    const handleSubmit = (e: FormEvent<HTMLButtonElement>, mode: FormMode) => {
        e.preventDefault();

        const item: ListItemType = {
            id: mode === 'add' ? listItems.length : targetItem.id,
            name: fields.name,
            qtdType: fields.qtdType,
            quantity: fields.quantity,
            options: options,
            alertQuantity: fields.alertQuantity,
            description: fields.description,
        };

        if (
            fields.qtdType === 'options' &&
            !optionsIsSaved(options, savedOptions)
        ) {
            setSavedOptions((prev) => [...prev, options]);
        }

        dispatch(mode === 'add' ? addItem(item) : editItem(item));

        setFields(itemFormInitialState);
        setOptions([]);
    };

    return (
        <form>
            <FormGroup elementId={'item-name'} labelText={'O que é:'}>
                <input
                    type='text'
                    id='item-name'
                    className='form-control'
                    placeholder='Nome do item'
                    value={fields.name}
                    onChange={(e) =>
                        setFields({ ...fields, name: e.target.value })
                    }
                />
            </FormGroup>
            <FormGroup elementId='item-type' labelText='Contar por:'>
                <Select
                    options={[
                        { label: 'Número', value: 'number' },
                        { label: 'Opções', value: 'options' },
                    ]}
                    elementId={'item-type'}
                    change={(e) =>
                        setFields({
                            ...fields,
                            qtdType: (e.target as HTMLElement).dataset
                                .value as QuantityType,
                        })
                    }
                    value={fields.qtdType === 'number' ? 'Número' : 'Opções'}
                />
            </FormGroup>

            {fields.qtdType === 'options' && (
                <OptionsForm
                    options={options}
                    setOptions={setOptions}
                    savedOptions={savedOptions}
                    setSavedOptions={setSavedOptions}
                />
            )}

            <FormGroup elementId='item-quantity' labelText='Quantidade:'>
                {fields.qtdType === 'number' ? (
                    <QuantityInput
                        size='md'
                        elementId='item-quantity'
                        value={fields.quantity}
                        change={(e) =>
                            setFields({
                                ...fields,
                                quantity: Number(e.target.value),
                            })
                        }
                    />
                ) : (
                    <Select
                        elementId='item-quantity'
                        options={mapOptions(options, 'number')}
                        change={(e) =>
                            setFields({
                                ...fields,
                                quantity: Number(
                                    (e.target as HTMLElement).dataset.value
                                ),
                            })
                        }
                        value={options[fields.quantity] || '-'}
                        placeholderOption='Nenhuma opção encontrada'
                    />
                )}
            </FormGroup>
            <FormGroup elementId='item-alert' labelText='Alertar em:'>
                {fields.qtdType === 'number' ? (
                    <QuantityInput
                        size='md'
                        elementId='item-alert'
                        value={fields.alertQuantity}
                        change={(e) =>
                            setFields({
                                ...fields,
                                alertQuantity: Number(e.target.value),
                            })
                        }
                    />
                ) : (
                    <Select
                        elementId='item-alert'
                        options={mapOptions(options, 'number')}
                        change={(e) =>
                            setFields({
                                ...fields,
                                alertQuantity: Number(
                                    (e.target as HTMLElement).dataset.value
                                ),
                            })
                        }
                        value={options[fields.alertQuantity] || '-'}
                        placeholderOption='Nenhuma opção encontrada'
                    />
                )}
            </FormGroup>
            <FormGroup elementId='item-description' labelText='Descrição:'>
                <textarea
                    className='form-control'
                    id='item-description'
                    value={fields.description}
                    style={{ resize: 'none', height: '7rem' }}
                    onChange={(e) =>
                        setFields({ ...fields, description: e.target.value })
                    }
                />
            </FormGroup>
            <button
                type='submit'
                className='btn btn-dark'
                data-dismiss='modal'
                onClick={(e) => handleSubmit(e, formMode)}>
                <i
                    className={
                        formMode === 'add' ? 'bi bi-plus-lg' : 'bi bi-check-lg'
                    }
                />
                &nbsp;{formMode === 'add' ? 'Adicionar' : 'Salvar'}
            </button>
        </form>
    );
}
