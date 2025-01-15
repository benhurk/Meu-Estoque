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

    return { fields, setFields, options, setOptions, errors };
}
