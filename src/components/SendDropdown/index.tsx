import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './SendDropdown.module.css';

import { RootState } from '../../store';

import Modal from '../Modal';
import SendMenu from '../SendMenu';

export default function SendDropdown() {
    const [openSendMenu, setOpenSendMenu] = useState<boolean>(false);
    const [sendMode, setSendMode] = useState<'all' | 'warned' | 'selected'>(
        'all'
    );

    const listItems = useSelector((state: RootState) => state.list.items);
    const warnedItems = listItems.filter(
        (item) => item.quantity <= item.alertQuantity
    );
    const selectedItems = listItems.filter((item) => item.selected === true);

    const handleClick = (send: 'all' | 'warned' | 'selected') => {
        setSendMode(send);
        setOpenSendMenu(true);
    };

    return (
        <>
            <div className='dropdown'>
                <button
                    type='button'
                    className='btn btn-sm btn-primary dropdown-toggle'
                    data-bs-toggle='dropdown'>
                    <i className='bi bi-send-fill' />
                    &nbsp;Enviar
                </button>
                <ul className='dropdown-menu'>
                    <li>
                        <button
                            type='button'
                            className={`dropdown-item text-dark ${styles.itemButton}`}
                            disabled={listItems.length > 0 ? false : true}
                            onClick={() => handleClick('all')}>
                            <i className='bi bi-filter-circle-fill' />
                            &nbsp;Tudo
                        </button>
                    </li>
                    <li>
                        <button
                            type='button'
                            className={`dropdown-item text-danger ${styles.itemButton}`}
                            disabled={warnedItems.length > 0 ? false : true}
                            onClick={() => handleClick('warned')}>
                            <i className='bi bi-exclamation-circle-fill' />
                            &nbsp;Importantes
                        </button>
                    </li>
                    <li>
                        <button
                            type='button'
                            className={`dropdown-item text-primary ${styles.itemButton}`}
                            disabled={selectedItems.length > 0 ? false : true}
                            onClick={() => handleClick('selected')}>
                            <i className='bi bi-check-circle-fill' />
                            &nbsp;Selecionados
                        </button>
                    </li>
                </ul>
            </div>

            <Modal isOpen={openSendMenu} setIsOpen={setOpenSendMenu}>
                <SendMenu
                    setOpenSendMenu={setOpenSendMenu}
                    sendMode={sendMode}
                />
            </Modal>
        </>
    );
}
