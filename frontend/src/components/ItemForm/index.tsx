import { FormEvent } from 'react';

import styles from './ItemForm.module.css';

import useFormStore from '../../stores/formStore';
import useLogsStore from '../../stores/logsStore';
import useItemForm from '../../hooks/useItemForm';

import itemFormInitialState from '../../const/itemFormState';
import capitalizeString from '../../utils/capitalizeString';
import getNumberDiff from '../../utils/getLogDiff';
import abbreviateUnitOfMeasurement from '../../utils/abbreviateUnitOfMeasurement';

import { ItemFormMode as FormMode } from '../../types/ItemFormTypes';
import ListItemType from '../../types/ListItemTypes';

import QuantityInput from '../QuantityInput';
import FormGroup from '../FormGroup';
import useLocalListStore from '../../stores/localListStore';

type Props = {
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemForm({ setItemFormOpen }: Props) {
    const { addItem, editItem } = useLocalListStore();
    const { formMode } = useFormStore();
    const addNewLog = useLogsStore((state) => state.addNewLog);

    const { fields, setFields, targetItem, validate, errors } = useItemForm();

    const handleSubmit = (e: FormEvent<HTMLButtonElement>, mode: FormMode) => {
        e.preventDefault();

        if (validate()) {
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
                        newItem.quantityType === 'number'
                            ? String(newItem.quantity) +
                              ` ${abbreviateUnitOfMeasurement(
                                  newItem.unitOfMeasurement
                              )}`
                            : '',
                    diffType: null,
                });
            } else {
                editItem(newItem);

                if (newItem.quantity != targetItem.quantity) {
                    addNewLog({
                        item: newItem.name,
                        diff:
                            newItem.quantityType === 'number'
                                ? getNumberDiff(
                                      targetItem.quantity,
                                      newItem.quantity,
                                      newItem.unitOfMeasurement
                                  )
                                : '',
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
                <select id='item-type'>
                    <option value='number'>Número</option>
                    <option value='options'>Opções</option>
                </select>
            </FormGroup>
            {fields.quantityType === 'number' && (
                <FormGroup elementId='item-numberOf' labelText='Número de:'>
                    <select></select>
                </FormGroup>
            )}

            <FormGroup elementId='item-quantity' labelText='Quantidade:'>
                {fields.quantityType === 'number' ? (
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
                        unityOfMeasurement={fields.unitOfMeasurement}
                    />
                ) : (
                    <select></select>
                )}
            </FormGroup>
            <FormGroup elementId='item-alert' labelText='Alertar em:'>
                {fields.quantityType === 'number' ? (
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
                        unityOfMeasurement={fields.unitOfMeasurement}
                    />
                ) : (
                    <select></select>
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
