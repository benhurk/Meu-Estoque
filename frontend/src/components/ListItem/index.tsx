import { memo, useRef } from 'react';
import styles from './ListItem.module.css';

import useFormStore from '../../stores/formStore';

import ListItemType from '../../types/ListItemTypes';

import QuantityInput from '../QuantityInput';
import TextTooltip from '../TextTooltip';
import useLocalListStore from '../../stores/localListStore';
import useAuth from '../../hooks/useAuth';
import api from '../../api';
import useListStore from '../../stores/listStore';

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

    const logTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const initialQuantity = useRef<number>(item.quantity);

    const changeQuantity = (newValue: number) => {
        editLocalItem({ ...item, quantity: newValue });

        if (logTimeoutId.current) {
            clearTimeout(logTimeoutId.current);
        }

        logTimeoutId.current = setTimeout(() => {
            if (newValue != initialQuantity.current) {
                //log
                initialQuantity.current = newValue;
            }
        }, 5000);
    };

    const removeItem = async () => {
        if (accessToken) {
            const res = await api.delete(`/items/${item.id}`);
            if (res.status === 200) {
                removeUserItem(item.id);
            }
        } else if (guest) {
            removeLocalItem(item.id);
        }
    };

    const warn = item.quantity <= item.alertQuantity;

    return (
        <li className={styles.wraper}>
            <input
                type='checkbox'
                className={styles.check}
                checked={item.selected === true}
                onChange={() =>
                    editLocalItem({ ...item, selected: !item.selected })
                }
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
                    <div>
                        {item.quantityType === 'number' ? (
                            <QuantityInput
                                elementId='quantity'
                                value={item.quantity}
                                change={(e) => {
                                    changeQuantity(Number(e.target.value));
                                }}
                                unityOfMeasurement={item.unitOfMeasurement}
                            />
                        ) : (
                            <select></select>
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
