import styles from './LoadButton.module.css';

import ListItemType from '../../types/ListItemTypes';
import Logs from '../../types/Logs';
import useLogsStore from '../../stores/logsStore';
import useLocalListStore from '../../stores/localListStore';
import useListItems from '../../hooks/useListItems';

export default function LoadButton() {
    const listItems = useListItems();
    const { addItem } = useLocalListStore();
    const { logs, addNewLog } = useLogsStore();

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result: { list: ListItemType[]; logs: Logs[] } = JSON.parse(
                reader.result as string
            );

            result.list.forEach((loadedItem: ListItemType) => {
                const newItem: ListItemType = {
                    id: loadedItem.id,
                    name: loadedItem.name,
                    quantityType: loadedItem.quantityType,
                    unitOfMeasurement: loadedItem.unitOfMeasurement,
                    quantity: loadedItem.quantity,
                    alertQuantity: loadedItem.alertQuantity,
                    description: loadedItem.description,
                };

                const isValid =
                    !Object.values(newItem).some(
                        (val) => typeof val === 'undefined'
                    ) &&
                    !listItems.some(
                        (item) =>
                            item.name === newItem.name || item.id === newItem.id
                    );

                if (isValid) addItem(newItem);
            });

            result.logs.forEach((loadedLog: Logs) => {
                const newLog: Logs = {
                    id: loadedLog.id,
                    date: loadedLog.date,
                    item: loadedLog.item,
                    diff: loadedLog.diff,
                    diffType: loadedLog.diffType,
                };

                const validate =
                    !Object.values(newLog).some(
                        (val) => typeof val === 'undefined'
                    ) && !logs.some((log) => log.id === newLog.id);

                if (validate) addNewLog(newLog);
            });
        };

        if (e.target.files) {
            reader.readAsText(e.target.files[0]);
        }
    };

    return (
        <label className='btn btn-dropdown-item text-dark'>
            <i className='bi bi-file-earmark-arrow-up-fill' />
            &nbsp;Importar
            <input
                className={styles.fileInput}
                type='file'
                accept='.json, application/JSON'
                onChange={(e) => upload(e)}
            />
        </label>
    );
}
