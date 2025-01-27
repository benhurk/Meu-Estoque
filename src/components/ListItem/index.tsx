import ListItemType from '../../types/ListItemTypes';

import QuantityInput from '../QuantityInput';
import TextTooltip from '../TextTooltip';
import Select from '../Select';

import mapOptions from '../../utils/mapOptions';
import abbreviateNumberOf from '../../utils/abbreviateNumberOf';
import useListStore from '../../stores/listStore';
import useFormStore from '../../stores/formStore';
import useLogsStore from '../../stores/logsStore';

type Props = {
    item: ListItemType;
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ListItem({ item, setItemFormOpen }: Props) {
    const { editItem, removeItem } = useListStore();
    const { setFormMode, setTargetItem } = useFormStore();
    const addNewLog = useLogsStore((state) => state.addNewLog);

    const date = new Date().toLocaleDateString();

    const setEditForm = () => {
        setTargetItem(item);
        setFormMode('edit');
        setItemFormOpen(true);
    };

    const changeQuantity = (value: number) => {
        const previousQuantity = item.quantity;
        const difference =
            item.qtdType === 'number'
                ? String(value - previousQuantity)
                : `${item.options[previousQuantity]} -> ${item.options[value]}`;

        editItem({ ...item, quantity: value });

        addNewLog({ date: date, item: item.name, diff: difference });
    };

    const warn = item.quantity <= item.alertQuantity;

    return (
        <li className='position-relative list-group-item d-flex align-items-center'>
            <input
                type='checkbox'
                className='form-check-input me-3'
                checked={item.selected === true}
                onChange={() => editItem({ ...item, selected: !item.selected })}
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
                                <i className='bi bi-exclamation-diamond-fill text-danger mx-2'></i>
                            )}
                            {item.description && (
                                <TextTooltip
                                    classNames='d-inline'
                                    text={item.description || ''}
                                />
                            )}
                        </div>
                        <div>
                            {item.qtdType === 'number' ? (
                                <>
                                    <QuantityInput
                                        elementId='quantity'
                                        value={item.quantity}
                                        change={(e) =>
                                            changeQuantity(
                                                Number(e.target.value)
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
                                        changeQuantity(
                                            Number(
                                                e.currentTarget.dataset.value
                                            )
                                        )
                                    }
                                    value={item.options[item.quantity]}
                                />
                            )}
                        </div>
                    </div>
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
                        onClick={() => removeItem(item.id)}>
                        <i className='bi bi-trash-fill'></i>
                    </button>
                </div>
            </div>
        </li>
    );
}
