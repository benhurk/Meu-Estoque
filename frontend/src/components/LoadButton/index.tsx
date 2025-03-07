import api from '../../api';
import styles from './LoadButton.module.css';

import useLocalDataStore from '../../stores/localDataStore';
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
    const { items: listItems } = useUserData();
    const { userItems, setUserItems } = useUserDataStore();
    const { addLocalItem, addLocalLog } = useLocalDataStore();

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const result: { list: ListItemType[]; logs: Logs[] } = JSON.parse(
                reader.result as string
            );

            if (result.list && result.logs) {
                const validItems = result.list.filter((loadedItem) => {
                    const newItem: Omit<ListItemType, 'id'> = {
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
                        !listItems.some((item) => item.name === newItem.name)
                    );
                });

                const validLogs = result.logs.filter((loadedLog: Logs) => {
                    const newLog: Omit<Logs, 'id' | 'itemId'> = {
                        time: loadedLog.time,
                        itemName: loadedLog.itemName,
                        change: loadedLog.change,
                        month: loadedLog.month,
                        year: loadedLog.year,
                        type: loadedLog.type,
                    };

                    return (
                        !Object.values(newLog).some(
                            (val) => typeof val === 'undefined'
                        ) &&
                        validItems.some((item) => item.name === newLog.itemName)
                    );
                });

                if (validItems.length === 0 && validLogs.length === 0) {
                    triggerErrorToast(
                        'O arquivo selecionado não possui dados para serem importados.'
                    );
                } else {
                    const transformedLogs = validLogs.map(
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        ({ itemId, ...rest }) => rest
                    );

                    if (accessToken) {
                        try {
                            const res = await api.post('/items/upload', {
                                items: validItems,
                                logs: transformedLogs,
                            });

                            setUserItems([
                                ...userItems,
                                ...keysToCamelCase(res.data.uploadedItems),
                            ]);
                        } catch (error) {
                            handleApiErrors(error, triggerErrorToast);
                        }
                    } else if (guest) {
                        const newItems: { name: string; id: string }[] = [];

                        validItems.forEach((item) => {
                            const id = crypto.randomUUID();
                            addLocalItem({ ...item, id });
                            newItems.push({ name: item.name, id });
                        });
                        transformedLogs.forEach((log) =>
                            addLocalLog({
                                itemId: newItems.filter(
                                    (item) => item.name === log.itemName
                                )[0].id,
                                ...log,
                            })
                        );
                    }
                }
            } else {
                triggerErrorToast('O arquivo selecionado é inválido.');
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
