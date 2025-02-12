import { FormEvent } from 'react';

import styles from './ItemForm.module.css';

import useListStore from '../../stores/listStore';
import useFormStore from '../../stores/formStore';
import useSavedOptionsStore from '../../stores/savedOptionsStore';
import useLogsStore from '../../stores/logsStore';
import useItemForm from '../../hooks/useItemForm';

import mapOptions from '../../utils/mapOptions';
import optionsIsSaved from '../../utils/optionsIsSaved';
import itemFormInitialState from '../../const/itemFormState';
import capitalizeString from '../../utils/capitalizeString';
import getNumberDiff from '../../utils/getLogDiff';
import abbreviateNumberOf from '../../utils/abbreviateNumberOf';

import { FormMode } from '../../types/ItemFormTypes';
import ListItemType, {
    NumberOf,
    QuantityType,
} from '../../types/ListItemTypes';
import optionsForNumberOf from '../../const/optionsForNumberOf';

import QuantityInput from '../QuantityInput';
import OptionsForm from '../OptionsForm';
import FormGroup from '../FormGroup';
import Select from '../Select';

type Props = {
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemForm({ setItemFormOpen }: Props) {
    const { addItem, editItem } = useListStore();
    const { formMode } = useFormStore();
    const { savedOptions, saveOptions } = useSavedOptionsStore();
    const addNewLog = useLogsStore((state) => state.addNewLog);

    const { fields, setFields, targetItem, validate, errors } = useItemForm();

    const handleSubmit = (e: FormEvent<HTMLButtonElement>, mode: FormMode) => {
        e.preventDefault();

        if (validate()) {
            if (
                fields.qtdType === 'options' &&
                !optionsIsSaved(fields.options, savedOptions)
            ) {
                saveOptions(fields.options);
            }

            const newItem: ListItemType = {
                id: mode === 'add' ? crypto.randomUUID() : targetItem.id,
                ...fields,
                name: capitalizeString(fields.name),
            };

            if (mode === 'add') {
                addItem(newItem);
                addNewLog({
                    item: newItem.name,
                    diff:
                        newItem.qtdType === 'number'
                            ? String(newItem.quantity) +
                              ` ${abbreviateNumberOf(newItem.numberOf)}`
                            : newItem.options[newItem.quantity],
                    diffType: null,
                });
            } else {
                editItem(newItem);

                if (newItem.quantity != targetItem.quantity) {
                    addNewLog({
                        item: newItem.name,
                        diff:
                            newItem.qtdType === 'number'
                                ? getNumberDiff(
                                      targetItem.quantity,
                                      newItem.quantity,
                                      newItem.numberOf
                                  )
                                : newItem.options[newItem.quantity],
                        diffType:
                            newItem.quantity > targetItem.quantity
                                ? 'increase'
                                : 'decrease',
                    });
                }
            }

            setItemFormOpen(false);
            setFields(itemFormInitialState);
        }
    };

    return (
        <div className={styles.form}>
            <FormGroup
                elementId={'item-name'}
                labelText={'O que é:'}
                error={errors.nameError}>
                <input
                    type='text'
                    id='item-name'
                    className='input'
                    placeholder='Nome do item'
                    value={fields.name}
                    onChange={(e) =>
                        setFields({
                            ...fields,
                            name: e.target.value,
                        })
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
                        options={fields.options}
                        setOptions={(newOptions: string[]) =>
                            setFields({ ...fields, options: newOptions })
                        }
                    />
                </FormGroup>
            )}

            {fields.qtdType === 'number' && (
                <FormGroup
                    elementId='item-numberOf'
                    labelText='Unidade de medida:'>
                    <Select
                        elementId='item-numberOf'
                        options={optionsForNumberOf}
                        value={fields.numberOf}
                        change={(e) =>
                            setFields({
                                ...fields,
                                numberOf: e.currentTarget.dataset
                                    .value! as NumberOf,
                            })
                        }
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
                        unityOfMeasurement={fields.numberOf}
                    />
                ) : (
                    <Select
                        elementId='item-quantity'
                        options={mapOptions(fields.options, 'number')}
                        change={(e) =>
                            setFields({
                                ...fields,
                                quantity: Number(e.currentTarget.dataset.value),
                            })
                        }
                        value={fields.options[fields.quantity] || '-'}
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
                        unityOfMeasurement={fields.numberOf}
                    />
                ) : (
                    <Select
                        elementId='item-alert'
                        options={mapOptions(fields.options, 'number')}
                        change={(e) =>
                            setFields({
                                ...fields,
                                alertQuantity: Number(
                                    e.currentTarget.dataset.value
                                ),
                            })
                        }
                        value={fields.options[fields.alertQuantity] || '-'}
                        placeholderOption='Nenhuma opção encontrada'
                    />
                )}
            </FormGroup>
            <FormGroup elementId='item-description' labelText='Descrição:'>
                <textarea
                    className={`input ${styles.description}`}
                    id='item-description'
                    placeholder='Anotações sobre o item. Exemplo: Onde encontra-lo, modo de preparo, tempo de validade, etc. (Opcional)'
                    value={fields.description}
                    onChange={(e) =>
                        setFields({ ...fields, description: e.target.value })
                    }
                />
            </FormGroup>
            <button
                type='button'
                className={`btn btn-dark ${styles.submitButton}`}
                onClick={(e) => handleSubmit(e, formMode)}>
                <i
                    className={
                        formMode === 'add' ? 'bi bi-plus-lg' : 'bi bi-check-lg'
                    }
                />
                &nbsp;{formMode === 'add' ? 'Adicionar' : 'Salvar'}
            </button>
        </div>
    );
}
