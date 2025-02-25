import api from '../../api';
import styles from './LoadButton.module.css';

import useLocalLogsStore from '../../stores/localLogsStore';
import useLocalListStore from '../../stores/localItemsStore';
import useAuth from '../../hooks/useAuth';
import useUserDataStore from '../../stores/userDataStore';
import useUserData from '../../hooks/useUserData';

import ListItemType from '../../types/ListItemTypes';
import Logs from '../../types/Logs';
import handleApiErrors from '../../utils/handleApiErrors';
import { triggerErrorToast } from '../../utils/triggerToast';
import keysToCamelCase from '../../utils/snakeToCamel';

export default function LoadButton() {
    const { accessToken, guest } = useAuth();
    const { items: listItems, logs } = useUserData();
    const { userItems, setUserItems } = useUserDataStore();
    const addLocalItem = useLocalListStore((state) => state.addLocalItem);
    const { addNewLocalLog } = useLocalLogsStore();

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const result: { list: ListItemType[]; logs: Logs[] } = JSON.parse(
                reader.result as string
            );

            const validItems = result.list.filter((loadedItem) => {
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
                            item.name === newItem.name || item.id === newItem.id
                    )
                );
            });

            const validLogs = result.logs.filter((loadedLog: Logs) => {
                const newLog: Logs = {
                    id: loadedLog.id,
                    time: loadedLog.time,
                    itemName: loadedLog.itemName,
                    itemId: loadedLog.itemId,
                    change: loadedLog.change,
                    month: loadedLog.month,
                    type: loadedLog.type,
                };

                return (
                    !Object.values(newLog).some(
                        (val) => typeof val === 'undefined'
                    ) && !logs.some((log) => log.id === newLog.id)
                );
            });

            if (accessToken) {
                try {
                    const res = await api.post('/items/upload', {
                        items: validItems,
                        logs: validLogs,
                    });

                    setUserItems([
                        ...userItems,
                        ...keysToCamelCase(res.data.uploadedItems),
                    ]);
                } catch (error) {
                    handleApiErrors(error, triggerErrorToast);
                }
            } else if (guest) {
                validItems.forEach((item) => addLocalItem(item));
                validLogs.forEach((log) => addNewLocalLog(log));
            }
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
