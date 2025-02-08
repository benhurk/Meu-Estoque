import { useState } from 'react';
import Modal from '../Modal';
import LogsTable from '../LogsTable';

export default function StatisticsButton() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <button
                type='button'
                className='btn btn-yellow'
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
