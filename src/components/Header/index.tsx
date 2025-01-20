import DownloadButton from '../DownloadButton';
import LoadButton from '../LoadButton';
import SendDropdown from '../SendDropdown';

export default function Header() {
    return (
        <header className='py-5 bg-dark'>
            <div className='wraper'>
                <h1 className='text-center text-light fw-bold mb-4'>EZtoque</h1>
                <div className='d-flex justify-content-center gap-3'>
                    <SendDropdown />
                    <DownloadButton />
                    <LoadButton />
                </div>
            </div>
        </header>
    );
}
