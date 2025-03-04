import { FormEvent, useState } from 'react';

import api from '../../api';
import styles from './ItemForm.module.css';

import useAuth from '../../hooks/useAuth';
import useItemForm from '../../hooks/useItemForm';
import useItemFormStore from '../../stores/itemFormStore';
import useUserDataStore from '../../stores/userDataStore';
import useLocalListStore from '../../stores/localDataStore';

import unitsOfMeasurementOptions from '../../consts/unitsOfMeasurementOptions';
import { defaultQuantityOptions } from '../../consts/quantityOptions';
import capitalizeString from '../../utils/capitalizeString';
import handleApiErrors from '../../utils/handleApiErrors';
import { triggerErrorToast } from '../../utils/triggerToast';

import { ItemFormMode as FormMode } from '../../types/ItemFormTypes';
import ListItemType, {
    QuantityType,
    UnitsOfMeasurement,
} from '../../types/ListItemTypes';

import QuantityInput from '../QuantityInput';
import FormGroup from '../FormGroup';
import Select from '../Select';

type Props = {
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemForm({ setItemFormOpen }: Props) {
    const { accessToken, guest } = useAuth();
    const { addUserItem, editUserItem } = useUserDataStore();
    const { addLocalItem, editLocalItem } = useLocalListStore();
    const { formMode } = useItemFormStore();
    const { fields, setFields, targetItem, validate, errors } = useItemForm();

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
        mode: FormMode
    ) => {
        e.preventDefault();

        if (validate()) {
            const newItem: Omit<ListItemType, 'id'> = {
                ...fields,
                name: capitalizeString(fields.name),
            };

            if (accessToken) {
                setLoading(true);
                try {
                    if (mode === 'add') {
                        const res = await api.post('/items', newItem);
                        addUserItem(res.data.newItem);
                    } else if (mode === 'edit') {
                        const res = await api.put(
                            `/items/${targetItem.id}`,
                            newItem
                        );
                        editUserItem(res.data.editedItem);
                    }

                    setItemFormOpen(false);
                } catch (error) {
                    handleApiErrors(error, triggerErrorToast);
                } finally {
                    setLoading(false);
                }
            }

            if (guest) {
                if (mode === 'add') {
                    addLocalItem(newItem);
                } else if (mode === 'edit') {
                    editLocalItem({ ...newItem, id: targetItem.id });
                }
                setItemFormOpen(false);
            }
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={(e) => handleSubmit(e, formMode)}>
            <FormGroup
                elementId={'item-name'}
                labelText={'O que é:'}
                error={errors.nameError}>
                <input
                    type='text'
                    id='item-name'
                    maxLength={50}
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

            {formMode === 'add' && (
                <FormGroup elementId='item-type' labelText='Contar por:'>
                    <Select
                        elementId='item-type'
                        options={[
                            { label: 'Número', value: 'number' },
                            { label: 'Opções', value: 'options' },
                        ]}
                        value={
                            fields.quantityType === 'number'
                                ? 'Número'
                                : 'Opções'
                        }
                        change={(e) =>
                            setFields({
                                ...fields,
                                quantityType: e.currentTarget.dataset
                                    .value! as QuantityType,
                            })
                        }
                    />
                </FormGroup>
            )}

            {fields.quantityType === 'number' && (
                <FormGroup elementId='item-numberOf' labelText='Número de:'>
                    <Select
                        elementId='item-numberOf'
                        options={unitsOfMeasurementOptions}
                        value={fields.unitOfMeasurement}
                        change={(e) =>
                            setFields({
                                ...fields,
                                unitOfMeasurement: e.currentTarget.dataset
                                    .value! as UnitsOfMeasurement,
                            })
                        }
                    />
                </FormGroup>
            )}

            {formMode === 'add' && (
                <FormGroup elementId='item-quantity' labelText='Quantidade:'>
                    {fields.quantityType === 'number' ? (
                        <QuantityInput
                            elementId='item-quantity'
                            value={fields.quantity}
                            change={(e) =>
                                setFields({
                                    ...fields,
                                    quantity: Number(e.target.value),
                                })
                            }
                            unitOfMeasurement={fields.unitOfMeasurement}
                        />
                    ) : (
                        <Select
                            elementId='item-quantity'
                            value={
                                defaultQuantityOptions[fields.quantity].label
                            }
                            options={defaultQuantityOptions}
                            change={(e) =>
                                setFields({
                                    ...fields,
                                    quantity: Number(
                                        e.currentTarget.dataset.value
                                    ),
                                })
                            }
                        />
                    )}
                </FormGroup>
            )}

            <FormGroup elementId='item-alert' labelText='Alertar em:'>
                {fields.quantityType === 'number' ? (
                    <QuantityInput
                        elementId='item-alert'
                        value={fields.alertQuantity}
                        change={(e) =>
                            setFields({
                                ...fields,
                                alertQuantity: Number(e.target.value),
                            })
                        }
                        unitOfMeasurement={fields.unitOfMeasurement}
                    />
                ) : (
                    <Select
                        elementId='item-alert'
                        value={
                            defaultQuantityOptions[fields.alertQuantity].label
                        }
                        options={defaultQuantityOptions}
                        change={(e) =>
                            setFields({
                                ...fields,
                                alertQuantity: Number(
                                    e.currentTarget.dataset.value
                                ),
                            })
                        }
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
                type='submit'
                className={`btn btn-dark ${styles.submitButton}`}
                disabled={loading}>
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
