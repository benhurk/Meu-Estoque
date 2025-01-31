import { useState } from 'react';

import styles from './RemoveMultiple.module.css';

import Modal from '../Modal';
import useListStore from '../../stores/listStore';
import useLogsStore from '../../stores/logsStore';

export default function RemoveMultipleButton() {
    const { items: listItems, removeItem, clearList } = useListStore();
    const addNewLog = useLogsStore((state) => state.addNewLog);

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const selectedItems = listItems.filter((item) => item.selected === true);
    const dynamicText =
        selectedItems.length > 0 ? selectedItems.length + ' itens' : 'tudo';

    const removeItems = () => {
        if (selectedItems.length > 0) {
            selectedItems.forEach((item) => {
                removeItem(item.id);
                addNewLog({ item: item.name, diff: 'Removido' });
            });
        } else clearList();

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
                {`Apagar ${dynamicText}`}
            </button>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
                <div>
                    <span className={`text-red ${styles.removeWarning}`}>
                        {`Deseja mesmo apagar ${dynamicText}?`}
                    </span>
                    <div className={styles.buttonsArea}>
                        <button
                            type='button'
                            className='btn btn-red me-2'
                            onClick={() => removeItems()}>
                            Apagar
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
