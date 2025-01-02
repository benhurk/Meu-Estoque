import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { addItem, editItem } from '../../store/reducers/list';

import ListItemType, { Quantity } from '../../types/ListItem';

import QuantityInput from '../QuantityInput';
import OptionsList from '../OptionsList';
import OptionsForm from '../OptionsForm';

export default function ItemForm() {
    const dispatch = useDispatch();

    const listItems = useSelector((state: RootState) => state.list.items);
    const { formMode, targetId } = useSelector(
        (state: RootState) => state.form
    );

    const [nameField, setNameField] = useState<string>('');
    const [typeField, setTypeField] = useState<Quantity>('number');
    const [options, setOptions] = useState<string[]>([]);
    const [quantityField, setQuantityField] = useState<number>(0);
    const [alertField, setAlertField] = useState<number>(0);
    const [descriptionField, setDescriptionField] = useState<string>('');

    useEffect(() => {
        if (formMode === 'edit') {
            const targetItem = listItems.filter(
                (item) => item.id === targetId
            )[0];

            if (targetItem) {
                setNameField(targetItem.name);
                setTypeField(targetItem.qtdType);
                setQuantityField(targetItem.quantity);
                setAlertField(targetItem.alertQuantity);
                setDescriptionField(targetItem.description as string);
            }
        }

        if (formMode === 'add') {
            setNameField('');
            setTypeField('number');
            setOptions([]);
            setQuantityField(0);
            setAlertField(0);
            setDescriptionField('');
        }
    }, [formMode, listItems, targetId]);

    const createNewItem = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newItem: ListItemType = {
            id: listItems.length,
            name: nameField,
            qtdType: typeField,
            quantity: quantityField,
            alertQuantity: alertField,
            description: descriptionField,
        };

        dispatch(addItem(newItem));
    };

    const saveItem = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const editedItem: ListItemType = {
            id: targetId,
            name: nameField,
            qtdType: typeField,
            quantity: quantityField,
            alertQuantity: alertField,
            description: descriptionField,
        };

        dispatch(editItem(editedItem));
    };

    return (
        <form>
            <div className='form-group mb-3'>
                <label htmlFor='item-name' className='mb-1 text-sm'>
                    O que é:
                </label>
                <input
                    type='text'
                    id='item-name'
                    className='form-control'
                    placeholder='Nome do item'
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)}
                />
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='item-qtdtype' className='mb-1'>
                    Contar por:
                </label>
                <select
                    value={typeField}
                    onChange={(e) => setTypeField(e.target.value as Quantity)}
                    id='item-qtdtype'
                    className='form-select'>
                    <option value='number'>Número</option>
                    <option value='options'>Opções</option>
                </select>
            </div>
            {typeField === 'options' && (
                <div className='mb-3'>
                    <div className='form-group mb-1'>
                        <OptionsForm setOptions={setOptions} />
                    </div>
                    {options.length > 0 && (
                        <OptionsList
                            options={options}
                            setOptions={setOptions}
                        />
                    )}
                </div>
            )}
            <div className='form-group mb-3'>
                <label htmlFor='item-qtd' className='mb-1 d-block'>
                    Quantidade:
                </label>
                <QuantityInput
                    size='md'
                    type={typeField}
                    value={quantityField}
                    change={(e) => setQuantityField(Number(e.target.value))}
                />
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='item-qtd-alert' className='mb-1 d-block'>
                    Alertar quando tiver:
                </label>
                <QuantityInput
                    size='md'
                    type={typeField}
                    value={alertField}
                    change={(e) => setAlertField(Number(e.target.value))}
                />
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='description' className='mb-1 d-block'>
                    Descrição:
                </label>
                <textarea
                    className='form-control'
                    id='description'
                    value={descriptionField}
                    style={{ resize: 'none', height: '7rem' }}
                    onChange={(e) => setDescriptionField(e.target.value)}
                />
            </div>
            {formMode === 'add' ? (
                <button
                    type='submit'
                    className='btn btn-dark'
                    data-dismiss='modal'
                    onClick={(e) => createNewItem(e)}>
                    <i className='bi bi-plus-lg' /> Adicionar
                </button>
            ) : (
                <button
                    type='submit'
                    className='btn btn-dark'
                    data-dismiss='modal'
                    onClick={(e) => saveItem(e)}>
                    <i className='bi bi-check-lg' /> Salvar
                </button>
            )}
        </form>
    );
}
