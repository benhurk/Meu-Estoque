import DownloadBtn from '../DownloadBtn';
import LoadBtn from '../LoadBtn';
import Modal from '../Modal';
import SendButton from '../SendButton';

export default function Header() {
    return (
        <header className='py-5 bg-dark'>
            <div className='wraper'>
                <h1 className='text-center text-light fw-bold mb-4'>EZtoque</h1>
                <div className='d-flex justify-content-center gap-3'>
                    <button
                        type='button'
                        className='btn btn-sm btn-primary'
                        data-toggle='modal'
                        data-target='#send-menu'>
                        <i className='bi bi-send-fill' />
                        &nbsp;Enviar
                    </button>
                    <DownloadBtn />
                    <LoadBtn />
                </div>

                <Modal elementId='send-menu'>
                    <div className='d-flex justify-content-center gap-2'>
                        <SendButton sendMode='all' />
                        <SendButton sendMode='warn' />
                    </div>
                </Modal>
            </div>
        </header>
    );
}
