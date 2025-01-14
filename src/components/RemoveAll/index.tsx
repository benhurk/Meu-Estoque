import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { clearList } from '../../store/reducers/list';

import Modal from '../Modal';

type Props = {
    disabled: boolean;
};

export default function RemoveAllButton({ disabled }: Props) {
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <button
                type='button'
                className='btn btn-danger'
                disabled={disabled}
                onClick={() => setModalOpen(true)}>
                <i className='bi bi-trash-fill' /> Apagar tudo
            </button>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
                <div className='text-center'>
                    <span className='d-block fs-5 text-danger fw-bold border-bottom mb-4 pb-2'>
                        Deseja mesmo apagar tudo?
                    </span>
                    <button
                        type='button'
                        className='btn btn-danger me-2'
                        onClick={() => {
                            dispatch(clearList());
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
