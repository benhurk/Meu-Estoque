import { useDispatch } from 'react-redux';

import ListItemType from '../../types/ListItemType';

import { removeItem, editItem } from '../../store/reducers/list';
import { setFormMode, setTargetItem } from '../../store/reducers/form';

import QuantityInput from '../QuantityInput';
import TextTooltip from '../TextTooltip';
import Select from '../Select';
import mapOptions from '../../utils/mapOptions';
import { useMemo } from 'react';

export default function ListItem({
    id,
    name,
    qtdType,
    quantity,
    options,
    alertQuantity,
    description,
}: ListItemType) {
    const dispatch = useDispatch();

    const object: ListItemType = useMemo(() => {
        return {
            id,
            name,
            qtdType,
            quantity,
            options,
            alertQuantity,
            description,
        };
    }, [alertQuantity, description, id, name, options, qtdType, quantity]);

    const setEditForm = () => {
        dispatch(setTargetItem(object));
        dispatch(setFormMode('edit'));
    };

    const warn = quantity <= alertQuantity;

    return (
        <li className='list-group-item d-flex align-items-center justify-content-between'>
            <div className='w-75 d-flex gap-4'>
                <div>
                    <div className='mb-2'>
                        <span
                            className={`d-inline ${
                                warn ? 'text-danger' : 'text-primary'
                            }`}>
                            {name}
                        </span>
                        {warn && (
                            <i className='bi bi-exclamation-diamond-fill text-danger ms-2'></i>
                        )}
                    </div>
                    <div>
                        {qtdType === 'number' ? (
                            <QuantityInput
                                elementId='quantity'
                                value={quantity}
                                change={(e) =>
                                    dispatch(
                                        editItem({
                                            ...object,
                                            quantity: Number(e.target.value),
                                        })
                                    )
                                }
                            />
                        ) : (
                            <Select
                                elementId='quantity'
                                options={mapOptions(options, 'number')}
                                change={(e) =>
                                    dispatch(
                                        editItem({
                                            ...object,
                                            quantity: Number(
                                                (e.target as HTMLElement)
                                                    .dataset.value
                                            ),
                                        })
                                    )
                                }
                                value={options[quantity]}
                            />
                        )}
                    </div>
                </div>
                {description && (
                    <TextTooltip
                        classNames='align-self-center'
                        bootstrapIconClass='bi bi-chat-left-text-fill'
                        text={description}
                    />
                )}
            </div>
            <div>
                <button
                    type='button'
                    className='btn btn-sm btn-dark me-1'
                    data-toggle='modal'
                    data-target='#modal-form'
                    onClick={() => setEditForm()}>
                    <i className='bi bi-pencil-fill'></i>
                </button>
                <button
                    type='button'
                    className='btn btn-sm btn-danger'
                    onClick={() => dispatch(removeItem(id))}>
                    <i className='bi bi-trash-fill'></i>
                </button>
            </div>
        </li>
    );
}
