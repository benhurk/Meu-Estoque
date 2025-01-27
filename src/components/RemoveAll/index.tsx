import { useState } from 'react';

import Modal from '../Modal';
import useListStore from '../../stores/listStore';

export default function RemoveAllButton() {
    const { items: listItems, clearList } = useListStore();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const selectedItems = listItems.filter((item) => item.selected === true);
    const dynamicText =
        selectedItems.length > 0 ? selectedItems.length + ' itens' : 'tudo';

    return (
        <>
            <button
                type='button'
                className='btn btn-danger'
                disabled={listItems.length === 0 ? true : false}
                onClick={() => setModalOpen(true)}>
                <i className='bi bi-trash-fill' />
                &nbsp;
                {`Apagar ${dynamicText}`}
            </button>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
                <div className='text-center'>
                    <span className='d-block fs-5 text-danger fw-bold border-bottom mb-4 pb-2'>
                        {`Deseja mesmo apagar ${dynamicText} selecionados?`}
                    </span>
                    <button
                        type='button'
                        className='btn btn-danger me-2'
                        onClick={() => {
                            clearList();
                            setModalOpen(false);
                        }}>
                        Apagar tudo
                    </button>
                    <button
                        type='button'
                        className='btn btn-dark me-2'
                        onClick={() => setModalOpen(false)}>
                        Cancelar
                    </button>
                </div>
            </Modal>
        </>
    );
}
