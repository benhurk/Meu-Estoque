import { memo, useRef } from 'react';
import api from '../../api';
import styles from './ListItem.module.css';

import useFormStore from '../../stores/formStore';
import useLocalListStore from '../../stores/localListStore';
import useAuth from '../../hooks/useAuth';
import useListStore from '../../stores/listStore';

import ListItemType from '../../types/ListItemTypes';
import { defaultQuantityOptions } from '../../consts/quantityOptions';

import QuantityInput from '../QuantityInput';
import TextTooltip from '../TextTooltip';
import Select from '../Select';

type Props = {
    item: ListItemType;
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListItem = memo(function ListItem({ item, setItemFormOpen }: Props) {
    const { accessToken, guest } = useAuth();
    const { editUserItem, removeUserItem } = useListStore();
    const { editLocalItem, removeLocalItem } = useLocalListStore();
    const { setFormMode, setTargetItem } = useFormStore();

    const setEditForm = () => {
        setTargetItem(item.id);
        setFormMode('edit');
        setItemFormOpen(true);
    };

    const editTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const changeQuantity = (newValue: number) => {
        if (accessToken) {
            editUserItem(item.id, { ...item, quantity: newValue });

            if (editTimeout.current) clearTimeout(editTimeout.current);

            editTimeout.current = setTimeout(() => {
                api.put(`/items/${item.id}`, {
                    ...item,
                    quantity: newValue,
                });
            }, 1500);
        } else if (guest) {
            editLocalItem({ ...item, quantity: newValue });
        }
    };

    const removeItem = () => {
        if (accessToken) {
            removeUserItem(item.id);
        } else if (guest) {
            removeLocalItem(item.id);
        }
    };

    const selectItem = () => {
        if (accessToken) {
            editUserItem(item.id, { ...item, selected: !item.selected });
        } else if (guest) {
            editLocalItem({ ...item, selected: !item.selected });
        }
    };

    const warn = item.quantity <= item.alertQuantity;

    return (
        <li className={styles.wraper}>
            <input
                type='checkbox'
                className={styles.check}
                checked={item.selected === true}
                onChange={selectItem}
            />
            <div className={styles.inner}>
                <div className={styles.itemInfo}>
                    <div className={styles.itemTitle}>
                        <span className={warn ? 'text-red' : 'text-blue'}>
                            {item.name}
                        </span>
                        {warn && (
                            <i className='bi bi-exclamation-diamond-fill text-red' />
                        )}
                        {item.description && (
                            <TextTooltip text={item.description || ''} />
                        )}
                    </div>
                    <div className={styles.itemQuantity}>
                        {item.quantityType === 'number' ? (
                            <QuantityInput
                                elementId='quantity'
                                value={item.quantity}
                                change={(e) => {
                                    changeQuantity(Number(e.target.value));
                                }}
                                unitOfMeasurement={item.unitOfMeasurement}
                            />
                        ) : (
                            <Select
                                elementId='quantity'
                                value={
                                    defaultQuantityOptions[item.quantity].label
                                }
                                options={defaultQuantityOptions}
                                change={(e) =>
                                    changeQuantity(
                                        Number(e.currentTarget.dataset.value!)
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
                <div className={styles.itemButtons}>
                    <button
                        type='button'
                        className='btn btn-dark btn-circle bi bi-pencil-fill'
                        onClick={() => setEditForm()}
                    />
                    <button
                        type='button'
                        className='btn btn-red btn-circle bi bi-trash-fill'
                        onClick={removeItem}
                    />
                </div>
            </div>
        </li>
    );
});

export default ListItem;
