import { memo, useRef } from 'react';
import api from '../../api';
import styles from './ListItem.module.css';

import useItemFormStore from '../../stores/itemFormStore';
import useLocalDataStore from '../../stores/localDataStore';
import useAuth from '../../hooks/useAuth';
import useUserDataStore from '../../stores/userDataStore';

import ListItemType from '../../types/ListItemTypes';

import { defaultQuantityOptions } from '../../consts/quantityOptions';
import getLogChange from '../../utils/getLogChange';
import handleApiErrors from '../../utils/handleApiErrors';
import { triggerErrorToast } from '../../utils/triggerToast';

import QuantityInput from '../QuantityInput';
import TextTooltip from '../TextTooltip';
import Select from '../Select';
import months from '../../consts/months';

type Props = {
    item: ListItemType;
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListItem = memo(function ListItem({ item, setItemFormOpen }: Props) {
    const { accessToken, guest } = useAuth();
    const { editUserItem, removeUserItem } = useUserDataStore();
    const { editLocalItem, removeLocalItem, addLocalLog } = useLocalDataStore();
    const { setFormMode, setTargetItem } = useItemFormStore();

    const editTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const preChangeQuantity = useRef<number>(item.quantity);

    const changeQuantity = (newValue: number) => {
        const changeDiff = getLogChange(
            item.quantityType,
            preChangeQuantity.current,
            newValue,
            item.unitOfMeasurement
        );

        if (editTimeout.current) clearTimeout(editTimeout.current);

        if (accessToken) editUserItem({ ...item, quantity: newValue });
        else if (guest) editLocalItem({ ...item, quantity: newValue });

        editTimeout.current = setTimeout(async () => {
            const date = new Date();
            const now = date.toLocaleDateString([], {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            });

            if (accessToken) {
                try {
                    await api.put(`/items/quantity/${item.id}`, {
                        newValue,
                        time: now,
                        month: months[date.getMonth()],
                        year: date.getFullYear(),
                        change: changeDiff?.valueChange,
                        type: changeDiff?.type,
                    });

                    preChangeQuantity.current = newValue;
                } catch (error) {
                    handleApiErrors(error, triggerErrorToast);

                    editUserItem({
                        ...item,
                        quantity: preChangeQuantity.current,
                    });
                }
            } else if (guest && changeDiff) {
                addLocalLog({
                    itemName: item.name,
                    itemId: item.id,
                    change: changeDiff.valueChange,
                    type: changeDiff.type,
                    month: months[date.getMonth()],
                    time: now,
                    year: date.getFullYear(),
                });
            }
        }, 3000);
    };

    const setEditForm = () => {
        setTargetItem(item.id);
        setFormMode('edit');
        setItemFormOpen(true);
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
            editUserItem({ ...item, selected: !item.selected });
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
