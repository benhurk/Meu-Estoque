import { useEffect, useMemo, useState } from 'react';

import useUserData from './useUserData';
import useFormStore from '../stores/formStore';

import itemFormInitialState from '../consts/itemFormState';

export default function useItemForm() {
    const { items: listItems } = useUserData();
    const [fields, setFields] = useState(itemFormInitialState);
    const [errors, setErrors] = useState({
        nameError: '',
        optionsError: '',
    });
    const { formMode, targetItemId } = useFormStore();

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
                quantityType: targetItem.quantityType,
                unitOfMeasurement: targetItem.unitOfMeasurement,
                quantity: targetItem.quantity,
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

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    return { fields, setFields, targetItem, validate, errors };
}
