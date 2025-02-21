import { useMemo, useState } from 'react';

import api from '../../api';
import styles from './RemoveMultiple.module.css';

import useUserData from '../../hooks/useUserData';
import useAuth from '../../hooks/useAuth';
import useLocalLogsStore from '../../stores/localLogsStore';
import useLocalListStore from '../../stores/localItemsStore';
import useListStore from '../../stores/userDataStore';

import Modal from '../Modal';

export default function RemoveMultipleButton() {
    const { items: listItems, logs } = useUserData();
    const { accessToken, guest } = useAuth();
    const { removeSelectedUserItems, clearUserList } = useListStore();
    const { removeLocalItem, clearLocalList } = useLocalListStore();
    const { removeLocalLog, clearLocalLogs } = useLocalLogsStore();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const selectedItems = useMemo(
        () => listItems.filter((item) => item.selected === true),
        [listItems]
    );
    const selectedItemsNames = useMemo(
        () => selectedItems.map((item) => item.name),
        [selectedItems]
    );

    const dynamicText =
        selectedItems.length > 0 ? selectedItems.length + ' itens' : 'tudo';

    const removeAllItems = async () => {
        if (accessToken) {
            setLoading(true);
            try {
                await api.delete('/items/');
                clearUserList();
                setModalOpen(false);
            } catch {
                console.error('Algo deu errado, tente novamente.');
            } finally {
                setLoading(false);
            }
        } else if (guest) {
            clearLocalList();
            clearLocalLogs();
            setModalOpen(false);
        }
    };

    const removeSelectedItems = async () => {
        if (accessToken) {
            const ids = selectedItems.map((item) => item.id);
            setLoading(true);
            try {
                await api.delete('/items/x', { data: { ids } });
                removeSelectedUserItems(ids);
                setModalOpen(false);
            } catch {
                console.error('Algo deu errado, tente novamente.');
            } finally {
                setLoading(false);
            }
        } else if (guest) {
            selectedItems.forEach((item) => {
                logs.filter((log) => log.itemName === item.name).forEach(
                    (filteredLog) => removeLocalLog(filteredLog.id)
                );
                removeLocalItem(item.id);
            });
            setModalOpen(false);
        }
    };

    const handleRemoveItems = () => {
        const fn =
            selectedItems.length > 0 ? removeSelectedItems : removeAllItems;

        fn();
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
                            onClick={() => handleRemoveItems()}
                            disabled={loading}>
                            Remover
                        </button>
                        <button
                            type='button'
                            className='btn btn-dark me-2'
                            onClick={() => setModalOpen(false)}
                            disabled={loading}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
