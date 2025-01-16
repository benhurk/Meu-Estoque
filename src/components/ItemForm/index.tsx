import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { addItem, editItem } from '../../store/reducers/list';

import mapOptions from '../../utils/mapOptions';
import optionsIsSaved from '../../utils/optionsIsSaved';
import itemFormInitialState from '../../const/itemFormState';

import { FormMode } from '../../types/FormTypes';
import ListItemType, { QuantityType } from '../../types/ListItemType';

import QuantityInput from '../QuantityInput';
import OptionsForm from '../OptionsForm';
import FormGroup from '../FormGroup';
import Select from '../Select';
import useSavedOptions from '../../hooks/useSavedOptions';
import useItemForm from '../../hooks/useItemForm';

type Props = {
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemForm({ setItemFormOpen }: Props) {
    const dispatch = useDispatch();
    const listItems = useSelector((state: RootState) => state.list.items);
    const { formMode, targetItem } = useSelector(
        (state: RootState) => state.form
    );

    const { fields, setFields, options, setOptions, validate, errors } =
        useItemForm();
    const { savedOptions, setSavedOptions } = useSavedOptions();

    const handleSubmit = (e: FormEvent<HTMLButtonElement>, mode: FormMode) => {
        e.preventDefault();

        if (validate()) {
            const item: ListItemType = {
                id: mode === 'add' ? listItems.length : targetItem.id,
                options: options,
                ...fields,
            };

            if (
                fields.qtdType === 'options' &&
                !optionsIsSaved(options, savedOptions)
            ) {
                setSavedOptions((prev) => [...prev, options]);
            }

            dispatch(mode === 'add' ? addItem(item) : editItem(item));
            setItemFormOpen(false);
            setFields(itemFormInitialState);
            setOptions([]);
        }
    };

    return (
        <form>
            <FormGroup
                elementId={'item-name'}
                labelText={'O que é:'}
                error={errors.nameError}>
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
                            qtdType: e.currentTarget.dataset
                                .value as QuantityType,
                        })
                    }
                    value={fields.qtdType === 'number' ? 'Número' : 'Opções'}
                />
            </FormGroup>

            {fields.qtdType === 'options' && (
                <FormGroup
                    elementId='item-options'
                    labelText='Opções:'
                    error={errors.optionsError}>
                    <OptionsForm
                        options={options}
                        setOptions={setOptions}
                        savedOptions={savedOptions}
                        setSavedOptions={setSavedOptions}
                    />
                </FormGroup>
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
                                quantity: Number(e.currentTarget.dataset.value),
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
                                    e.currentTarget.dataset.value
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
