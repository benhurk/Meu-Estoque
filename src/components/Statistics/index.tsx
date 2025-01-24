import { useState } from 'react';
// import styles from './Statistics.module.css';
import Modal from '../Modal';
import LogsTable from '../LogsTable';

export default function Statistics() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <button
                type='button'
                className='btn btn-sm btn-warning'
                onClick={() => setOpen(true)}>
                <i className='bi bi-bar-chart-fill' />
                &nbsp;Registros
            </button>
            <Modal isOpen={open} setIsOpen={setOpen}>
                <LogsTable />
            </Modal>
        </>
    );
}
