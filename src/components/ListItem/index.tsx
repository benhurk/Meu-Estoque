import { useDispatch } from 'react-redux';

import ListItemType from '../../types/ListItemType';

import { removeItem, editItem } from '../../store/reducers/list';
import { setFormMode, setTargetItem } from '../../store/reducers/form';

import QuantityInput from '../QuantityInput';
import TextTooltip from '../TextTooltip';
import Select from '../Select';
import mapOptions from '../../utils/mapOptions';
import abbreviateNumberOf from '../../utils/abbreviateNumberOf';

type Props = {
    item: ListItemType;
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ListItem({ item, setItemFormOpen }: Props) {
    const dispatch = useDispatch();

    const setEditForm = () => {
        dispatch(setTargetItem(item));
        dispatch(setFormMode('edit'));
        setItemFormOpen(true);
    };

    const warn = item.quantity <= item.alertQuantity;

    return (
        <li className='position-relative list-group-item d-flex align-items-center'>
            <input
                type='checkbox'
                className='form-check-input me-3'
                onChange={() =>
                    dispatch(editItem({ ...item, selected: !item.selected }))
                }
            />
            <div className='d-flex justify-content-between w-100 align-items-center'>
                <div className='w-75 d-flex gap-4'>
                    <div>
                        <div className='mb-2'>
                            <span
                                className={`d-inline ${
                                    warn ? 'text-danger' : 'text-primary'
                                }`}>
                                {item.name}
                            </span>
                            {warn && (
                                <i className='bi bi-exclamation-diamond-fill text-danger ms-2'></i>
                            )}
                        </div>
                        <div>
                            {item.qtdType === 'number' ? (
                                <>
                                    <QuantityInput
                                        elementId='quantity'
                                        value={item.quantity}
                                        change={(e) =>
                                            dispatch(
                                                editItem({
                                                    ...item,
                                                    quantity: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            )
                                        }
                                    />
                                    <small className='text-dark'>
                                        {abbreviateNumberOf(item.numberOf)}
                                    </small>
                                </>
                            ) : (
                                <Select
                                    elementId='quantity'
                                    options={mapOptions(item.options, 'number')}
                                    change={(e) =>
                                        dispatch(
                                            editItem({
                                                ...item,
                                                quantity: Number(
                                                    (e.target as HTMLElement)
                                                        .dataset.value
                                                ),
                                            })
                                        )
                                    }
                                    value={item.options[item.quantity]}
                                />
                            )}
                        </div>
                    </div>
                    {item.description && (
                        <TextTooltip
                            classNames='align-self-center'
                            bootstrapIconClass='bi bi-chat-left-text-fill'
                            text={item.description || ''}
                        />
                    )}
                </div>
                <div className='d-flex'>
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
                        onClick={() => dispatch(removeItem(item.id))}>
                        <i className='bi bi-trash-fill'></i>
                    </button>
                </div>
            </div>
        </li>
    );
}
