import DownloadButton from '../DownloadButton';
import LoadButton from '../LoadButton';
import SendDropdown from '../SendDropdown';
import Statistics from '../Statistics';

export default function Header() {
    return (
        <header className='py-5 bg-dark'>
            <div className='wraper'>
                <h1 className='text-center text-light fw-bold mb-4'>EZtoque</h1>
                <div className='d-flex justify-content-center gap-2'>
                    <SendDropdown />
                    <Statistics />
                    <DownloadButton />
                    <LoadButton />
                </div>
                <div></div>
            </div>
        </header>
    );
}
