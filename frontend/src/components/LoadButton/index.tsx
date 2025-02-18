import styles from './LoadButton.module.css';

import ListItemType from '../../types/ListItemTypes';
import Logs from '../../types/Logs';
import useLogsStore from '../../stores/logsStore';
import useLocalListStore from '../../stores/localListStore';
import useListItems from '../../hooks/useListItems';
import useAuth from '../../hooks/useAuth';
import useListStore from '../../stores/listStore';

export default function LoadButton() {
    const { accessToken, guest } = useAuth();
    const listItems = useListItems();
    const addUserItem = useListStore((state) => state.addUserItem);
    const addLocalItem = useLocalListStore((state) => state.addLocalItem);
    const { logs, addNewLog } = useLogsStore();

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const result: { list: ListItemType[]; logs: Logs[] } = JSON.parse(
                reader.result as string
            );

            const batchSize = 20;
            for (let i = 0; i < result.list.length; i += batchSize) {
                const batch = result.list.slice(i, i + batchSize);
                const validItems = batch.filter((loadedItem) => {
                    const newItem: ListItemType = {
                        id: loadedItem.id,
                        name: loadedItem.name,
                        quantityType: loadedItem.quantityType,
                        unitOfMeasurement: loadedItem.unitOfMeasurement,
                        quantity: loadedItem.quantity,
                        alertQuantity: loadedItem.alertQuantity,
                        description: loadedItem.description,
                    };

                    return (
                        !Object.values(newItem).some(
                            (val) => typeof val === 'undefined'
                        ) &&
                        !listItems.some(
                            (item) =>
                                item.name === newItem.name ||
                                item.id === newItem.id
                        )
                    );
                });

                if (accessToken) {
                    await Promise.all(
                        validItems.map((item) => addUserItem(item))
                    );

                    await new Promise((resolve) => setTimeout(resolve, 2000));
                } else if (guest) {
                    validItems.forEach((item) => addLocalItem(item));
                }
            }

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
