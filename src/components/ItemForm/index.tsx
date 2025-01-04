import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { addItem, editItem } from '../../store/reducers/list';

import itemFormInitialState from '../../const/itemFormState';

import { FormMode } from '../../types/FormTypes';
import ListItemType, { QuantityType } from '../../types/ListItemType';

import QuantityInput from '../QuantityInput';
import OptionsForm from '../OptionsForm';
import FormGroup from '../FormGroup';

export default function ItemForm() {
    const dispatch = useDispatch();

    const [fields, setFields] = useState(itemFormInitialState);
    const [options, setOptions] = useState<string[]>([]);

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
        }
    }, [formMode, listItems, targetItem]);

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

        dispatch(mode === 'add' ? addItem(item) : editItem(item));
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
                <select
                    value={fields.qtdType}
                    onChange={(e) =>
                        setFields({
                            ...fields,
                            qtdType: e.target.value as QuantityType,
                        })
                    }
                    id='item-type'
                    className='form-select'>
                    <option value='number'>Número</option>
                    <option value='options'>Opções</option>
                </select>
            </FormGroup>

            {fields.qtdType === 'options' && (
                <FormGroup
                    elementId='item-options'
                    labelText='Adicionar opções:'>
                    <OptionsForm options={options} setOptions={setOptions} />
                </FormGroup>
            )}

            <FormGroup elementId='item-quantity' labelText='Quantidade:'>
                <QuantityInput
                    size='md'
                    elementId='item-quantity'
                    type={fields.qtdType}
                    value={fields.quantity}
                    options={options}
                    change={(e) =>
                        setFields({
                            ...fields,
                            quantity: Number(e.target.value),
                        })
                    }
                />
            </FormGroup>
            <FormGroup elementId='item-alert' labelText='Alertar em:'>
                <QuantityInput
                    size='md'
                    elementId='item-alert'
                    type={fields.qtdType}
                    value={fields.alertQuantity}
                    options={options}
                    change={(e) =>
                        setFields({
                            ...fields,
                            alertQuantity: Number(e.target.value),
                        })
                    }
                />
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
