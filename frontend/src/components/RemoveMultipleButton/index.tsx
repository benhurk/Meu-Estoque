import { useMemo, useState } from 'react';

import styles from './RemoveMultiple.module.css';

import Modal from '../Modal';
import useListStore from '../../stores/listStore';
import useLogsStore from '../../stores/logsStore';

export default function RemoveMultipleButton() {
    const { items: listItems, removeItem, clearList } = useListStore();
    const { logs, removeLog, clearLogs } = useLogsStore();

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
            selectedItems.forEach((item) => {
                logs.filter((log) => log.item === item.name).forEach(
                    (filteredLog) => removeLog(filteredLog.id)
                );
                removeItem(item.id);
            });
        } else {
            clearList();
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
