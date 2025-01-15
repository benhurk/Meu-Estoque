import { useState } from 'react';

import DownloadBtn from '../DownloadBtn';
import LoadBtn from '../LoadBtn';
import Modal from '../Modal';
import SendMenu from '../SendMenu';

export default function Header() {
    const [openSendMenu, setOpenSendMenu] = useState<boolean>(false);

    return (
        <header className='py-5 bg-dark'>
            <div className='wraper'>
                <h1 className='text-center text-light fw-bold mb-4'>EZtoque</h1>
                <div className='d-flex justify-content-center gap-3'>
                    <button
                        type='button'
                        className='btn btn-sm btn-primary'
                        onClick={() => setOpenSendMenu(true)}>
                        <i className='bi bi-send-fill' />
                        &nbsp;Enviar
                    </button>
                    <DownloadBtn />
                    <LoadBtn />
                </div>
            </div>

            <Modal isOpen={openSendMenu} setIsOpen={setOpenSendMenu}>
                <SendMenu />
            </Modal>
        </header>
    );
}
