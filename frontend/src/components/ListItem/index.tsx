import { memo, useRef } from 'react';
import styles from './ListItem.module.css';

import useFormStore from '../../stores/formStore';
import useLogsStore from '../../stores/logsStore';

import ListItemType from '../../types/ListItemTypes';

import QuantityInput from '../QuantityInput';
import TextTooltip from '../TextTooltip';
import getNumberDiff from '../../utils/getLogDiff';
import useLocalListStore from '../../stores/localListStore';

type Props = {
    item: ListItemType;
    setItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListItem = memo(function ListItem({ item, setItemFormOpen }: Props) {
    const { editItem, removeItem } = useLocalListStore();
    const { setFormMode, setTargetItem } = useFormStore();
    const { logs, addNewLog, removeLog } = useLogsStore();

    const setEditForm = () => {
        setTargetItem(String(item.id));
        setFormMode('edit');
        setItemFormOpen(true);
    };

    const logTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const initialQuantity = useRef<number>(item.quantity);

    const changeQuantity = (newValue: number) => {
        editItem({ ...item, quantity: newValue });

        if (logTimeoutId.current) {
            clearTimeout(logTimeoutId.current);
        }

        logTimeoutId.current = setTimeout(() => {
            if (newValue != initialQuantity.current) {
                addNewLog({
                    item: item.name,
                    diff:
                        item.quantityType === 'number'
                            ? getNumberDiff(
                                  initialQuantity.current,
                                  newValue,
                                  item.unitOfMeasurement
                              )
                            : '',
                    diffType:
                        newValue > initialQuantity.current
                            ? 'increase'
                            : 'decrease',
                });
                initialQuantity.current = newValue;
            }
        }, 5000);
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
                        onClick={() => {
                            logs.filter(
                                (log) => log.item === item.name
                            ).forEach((filteredLog) =>
                                removeLog(filteredLog.id)
                            );
                            removeItem(String(item.id));
                        }}
                    />
                </div>
            </div>
        </li>
    );
});

export default ListItem;
