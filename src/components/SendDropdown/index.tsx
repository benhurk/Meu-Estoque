import { useState } from 'react';

import styles from './SendDropdown.module.css';

import Modal from '../Modal';
import SendMenu from '../SendMenu';
import useListStore from '../../stores/listStore';

export default function SendDropdown() {
    const [openSendMenu, setOpenSendMenu] = useState<boolean>(false);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [sendMode, setSendMode] = useState<'all' | 'warned' | 'selected'>(
        'all'
    );

    const listItems = useListStore((state) => state.items);
    const warnedItems = listItems.filter(
        (item) => item.quantity <= item.alertQuantity
    );
    const selectedItems = listItems.filter((item) => item.selected === true);

    const handleClick = (send: 'all' | 'warned' | 'selected') => {
        setSendMode(send);
        setOpenSendMenu(true);
        setOpenDropdown(false);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (e.currentTarget && !e.currentTarget.contains(e.relatedTarget)) {
            setOpenDropdown(false);
        }
    };

    return (
        <>
            <div tabIndex={0} onBlur={(e) => handleBlur(e)}>
                <button
                    type='button'
                    className={`btn btn-blue ${styles.triggerButton}`}
                    onClick={() => setOpenDropdown(!openDropdown)}>
                    <i className='bi bi-send-fill' />
                    &nbsp;Enviar
                    <i className='dropdown-icon bi bi-chevron-down' />
                </button>
                {openDropdown && (
                    <ul
                        className={styles.dropdownMenu}
                        onClick={(e) => e.stopPropagation()}>
                        <li>
                            <button
                                type='button'
                                className={styles.itemButton}
                                disabled={listItems.length > 0 ? false : true}
                                onClick={() => handleClick('all')}>
                                <i className='bi bi-filter-circle-fill' />
                                &nbsp;Tudo
                            </button>
                        </li>
                        <li>
                            <button
                                type='button'
                                className={`text-red ${styles.itemButton}`}
                                disabled={warnedItems.length > 0 ? false : true}
                                onClick={() => handleClick('warned')}>
                                <i className='bi bi-exclamation-circle-fill' />
                                &nbsp;Importantes
                            </button>
                        </li>
                        <li>
                            <button
                                type='button'
                                className={`text-blue ${styles.itemButton}`}
                                disabled={
                                    selectedItems.length > 0 ? false : true
                                }
                                onClick={() => handleClick('selected')}>
                                <i className='bi bi-check-circle-fill' />
                                &nbsp;Selecionados
                            </button>
                        </li>
                    </ul>
                )}
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
