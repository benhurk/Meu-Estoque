import { useEffect, useMemo, useState } from 'react';

import useListItems from './useListItems';
import useFormStore from '../stores/formStore';

import itemFormInitialState from '../const/itemFormState';

export default function useItemForm() {
    const [fields, setFields] = useState(itemFormInitialState);
    const [errors, setErrors] = useState({
        nameError: '',
        optionsError: '',
    });
    const { formMode, targetItemId } = useFormStore();

    const listItems = useListItems();
    const itemNames = useMemo(
        () => new Set(listItems.map((item) => item.name)),
        [listItems]
    );
    const targetItem = useMemo(
        () => listItems.filter((item) => item.id === targetItemId)[0],
        [listItems, targetItemId]
    );

    useEffect(() => {
        if (formMode === 'edit') {
            setFields({
                name: targetItem.name,
                qtdType: targetItem.qtdType,
                numberOf: targetItem.numberOf,
                quantity: targetItem.quantity,
                options: targetItem.options,
                alertQuantity: targetItem.alertQuantity,
                description: targetItem.description,
            });
        }

        if (formMode === 'add') {
            setFields(itemFormInitialState);
        }
    }, [formMode, targetItem]);

    const validate = () => {
        const newErrors = {
            nameError: '',
            optionsError: '',
        };

        if (!fields.name) {
            newErrors.nameError = 'O nome não pode ficar em branco';
        } else if (itemNames.has(fields.name) && formMode != 'edit') {
            newErrors.nameError = 'Um item com esse nome já existe.';
        }

        if (fields.qtdType === 'options') {
            if (fields.options.length === 0) {
                newErrors.optionsError = 'As opções não podem ficar vazias.';
            } else if (fields.options.length < 2) {
                newErrors.optionsError = 'O mínimo de opções é 2.';
            }
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    return { fields, setFields, targetItem, validate, errors };
}
