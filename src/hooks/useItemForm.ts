import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import itemFormInitialState from '../const/itemFormState';

import { RootState } from '../store';

export default function useItemForm() {
    const [fields, setFields] = useState(itemFormInitialState);
    const [options, setOptions] = useState<string[]>([]);
    const [errors, setErrors] = useState({
        nameError: '',
        optionsError: '',
    });

    const listItems = useSelector((state: RootState) => state.list.items);
    const { formMode, targetItem } = useSelector(
        (state: RootState) => state.form
    );

    useEffect(() => {
        if (formMode === 'edit') {
            setFields({
                name: targetItem.name,
                qtdType: targetItem.qtdType,
                numberOf: targetItem.numberOf,
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

    const validate = () => {
        const newErrors = {
            nameError: '',
            optionsError: '',
        };

        if (!fields.name) {
            newErrors.nameError = 'O nome não pode ficar em branco';
        } else if (
            listItems.some(
                (item) => item.name === fields.name && item.id != targetItem.id
            )
        ) {
            newErrors.nameError = 'Um item com esse nome já existe.';
        }

        if (fields.qtdType === 'options') {
            if (options.length === 0) {
                newErrors.optionsError = 'As opções não podem ficar vazias.';
            } else if (options.length < 2) {
                newErrors.optionsError = 'O mínimo de opções é 2.';
            }
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    return { fields, setFields, options, setOptions, validate, errors };
}
