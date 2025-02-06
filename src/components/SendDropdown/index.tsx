import { useState } from 'react';

import Modal from '../Modal';
import SendMenu from '../SendMenu';
import useListStore from '../../stores/listStore';
import Dropdown from '../Dropdown';

export default function SendDropdown() {
    const [openSendMenu, setOpenSendMenu] = useState<boolean>(false);
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
    };

    return (
        <>
            <Dropdown
                buttonText='Enviar'
                buttonColorClass='btn-blue'
                buttonIconClass='bi-send-fill'>
                <li>
                    <button
                        type='button'
                        className='btn-dropdown-item'
                        disabled={listItems.length > 0 ? false : true}
                        onClick={() => handleClick('all')}>
                        <i className='bi bi-filter-circle-fill' />
                        &nbsp;Tudo
                    </button>
                </li>
                <li>
                    <button
                        type='button'
                        className='btn-dropdown-item text-red'
                        disabled={warnedItems.length > 0 ? false : true}
                        onClick={() => handleClick('warned')}>
                        <i className='bi bi-exclamation-circle-fill' />
                        &nbsp;Com alerta
                    </button>
                </li>
                <li>
                    <button
                        type='button'
                        className='btn-dropdown-item text-blue'
                        disabled={selectedItems.length > 0 ? false : true}
                        onClick={() => handleClick('selected')}>
                        <i className='bi bi-check-circle-fill' />
                        &nbsp;Selecionados
                    </button>
                </li>
            </Dropdown>

            <Modal isOpen={openSendMenu} setIsOpen={setOpenSendMenu}>
                <SendMenu
                    setOpenSendMenu={setOpenSendMenu}
                    sendMode={sendMode}
                />
            </Modal>
        </>
    );
}
