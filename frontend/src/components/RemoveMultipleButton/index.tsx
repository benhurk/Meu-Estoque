import { useMemo, useState } from 'react';

import styles from './RemoveMultiple.module.css';

import useUserData from '../../hooks/useUserData';
import useAuth from '../../hooks/useAuth';

import Modal from '../Modal';
import useLocalLogsStore from '../../stores/localLogsStore';
import useLocalListStore from '../../stores/localItemsStore';
import useListStore from '../../stores/userDataStore';

export default function RemoveMultipleButton() {
    const { items: listItems, logs } = useUserData();
    const { accessToken, guest } = useAuth();
    const { removeSelectedUserItems, clearUserList } = useListStore();
    const { removeLocalItem, clearLocalList } = useLocalListStore();
    const { removeLog, clearLogs } = useLocalLogsStore();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const selectedItems = useMemo(
        () => listItems.filter((item) => item.selected === true),
        [listItems]
    );
    const selectedItemsNames = selectedItems.map((item) => item.name);

    const dynamicText =
        selectedItems.length > 0 ? selectedItems.length + ' itens' : 'tudo';

    const removeItems = () => {
        if (selectedItems.length > 0) {
            if (accessToken) {
                removeSelectedUserItems(selectedItems.map((item) => item.id));
            } else if (guest) {
                selectedItems.forEach((item) => {
                    logs.filter((log) => log.itemName === item.name).forEach(
                        (filteredLog) => removeLog(filteredLog.id)
                    );
                    removeLocalItem(item.id);
                });
            }
        } else {
            if (accessToken) {
                clearUserList();
            } else if (guest) {
                clearLocalList();
            }
            clearLogs();
        }

        setModalOpen(false);
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-red'
                disabled={listItems.length === 0 ? true : false}
                onClick={() => setModalOpen(true)}>
                <i className='bi bi-trash-fill' />
                &nbsp;
                {`Remover ${dynamicText}`}
            </button>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
                <div>
                    <span className={`text-red ${styles.removeWarning}`}>
                        {`Deseja mesmo remover ${dynamicText}?`}
                    </span>
                    {selectedItems.length > 0 && (
                        <p
                            className={`text-red ${styles.itemsList}`}>{`Os seguintes itens serão removidos: ${selectedItemsNames.join(
                            ', '
                        )}.`}</p>
                    )}
                    <div className={styles.buttonsArea}>
                        <button
                            type='button'
                            className='btn btn-red me-2'
                            onClick={() => removeItems()}>
                            Remover
                        </button>
                        <button
                            type='button'
                            className='btn btn-dark me-2'
                            onClick={() => setModalOpen(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
