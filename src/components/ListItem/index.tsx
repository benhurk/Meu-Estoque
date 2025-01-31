import styles from './ListItem.module.css';

import ListItemType from '../../types/ListItemTypes';

import QuantityInput from '../QuantityInput';
import TextTooltip from '../TextTooltip';
import Select from '../Select';

import mapOptions from '../../utils/mapOptions';
import abbreviateNumberOf from '../../utils/abbreviateNumberOf';
import useListStore from '../../stores/listStore';
import useFormStore from '../../stores/formStore';
import useLogsStore from '../../stores/logsStore';
import { useRef } from 'react';

type Props = {
    item: ListItemType;
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ListItem({ item, setItemFormOpen }: Props) {
    const { editItem, removeItem } = useListStore();
    const { setFormMode, setTargetItem } = useFormStore();

    const addNewLog = useLogsStore((state) => state.addNewLog);

    const setEditForm = () => {
        setTargetItem(item);
        setFormMode('edit');
        setItemFormOpen(true);
    };

    const logTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const initialQuantity = useRef<number>(item.quantity);

    const changeQuantity = (newValue: number) => {
        const difference =
            item.qtdType === 'number'
                ? String(newValue - initialQuantity.current)
                : `${item.options[initialQuantity.current]} > ${
                      item.options[newValue]
                  }`;

        editItem({ ...item, quantity: newValue });

        if (logTimeoutId.current) {
            clearTimeout(logTimeoutId.current);
        }

        logTimeoutId.current = setTimeout(() => {
            addNewLog({
                item: item.name,
                diff: Number(difference) > 0 ? `+${difference}` : difference,
            });
            initialQuantity.current = newValue;
        }, 2000);
    };

    const warn = item.quantity <= item.alertQuantity;

    return (
        <li className={styles.wraper}>
            <input
                type='checkbox'
                className={styles.check}
                checked={item.selected === true}
                onChange={() => editItem({ ...item, selected: !item.selected })}
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
                        {item.qtdType === 'number' ? (
                            <>
                                <QuantityInput
                                    elementId='quantity'
                                    value={item.quantity}
                                    change={(e) => {
                                        changeQuantity(Number(e.target.value));
                                    }}
                                />
                                <small className={styles.itemUnityType}>
                                    {abbreviateNumberOf(item.numberOf)}
                                </small>
                            </>
                        ) : (
                            <div style={{ width: '30%' }}>
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
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.itemButtons}>
                    <button
                        type='button'
                        className='btn btn-dark btn-circle bi bi-pencil-fill'
                        onClick={() => setEditForm()}></button>
                    <button
                        type='button'
                        className='btn btn-red btn-circle bi bi-trash-fill'
                        onClick={() => removeItem(item.id)}></button>
                </div>
            </div>
        </li>
    );
}
