import { useState } from 'react';

import api from '../../api';
import styles from './RemoveAllButton.module.css';

import useUserData from '../../hooks/useUserData';
import useAuth from '../../hooks/useAuth';
import useLocalDataStore from '../../stores/localDataStore';
import useListStore from '../../stores/userDataStore';

import handleApiErrors from '../../utils/handleApiErrors';
import { triggerErrorToast } from '../../utils/triggerToast';

import Modal from '../Modal';
import Portal from '../Portal';

export default function RemoveAllButton() {
    const { items: listItems } = useUserData();
    const { accessToken, guest } = useAuth();
    const clearUserList = useListStore((state) => state.clearUserList);
    const clearLocalList = useLocalDataStore((state) => state.clearLocalList);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const removeItems = async () => {
        if (accessToken) {
            setLoading(true);
            try {
                await api.delete('/items/');
                clearUserList();
                setModalOpen(false);
            } catch (error) {
                handleApiErrors(error, triggerErrorToast);
            } finally {
                setLoading(false);
            }
        } else if (guest) {
            clearLocalList();
            setModalOpen(false);
        }
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-dropdown-item text-red'
                disabled={listItems.length === 0 ? true : false}
                onClick={() => setModalOpen(true)}>
                <i className='bi bi-trash-fill' />
                &nbsp;Remover tudo
            </button>

            {modalOpen && (
                <Portal>
                    <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
                        <div>
                            <span
                                className={`text-red ${styles.removeWarning}`}>
                                Deseja mesmo remover todos os itens?
                            </span>

                            <div className={styles.buttonsArea}>
                                <button
                                    type='button'
                                    className='btn btn-red me-2'
                                    onClick={() => removeItems()}
                                    disabled={loading}>
                                    Remover todos os itens
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
                </Portal>
            )}
        </>
    );
}
