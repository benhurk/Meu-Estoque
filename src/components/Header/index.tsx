import styles from './Header.module.css';

import DownloadButton from '../DownloadButton';
import LoadButton from '../LoadButton';
import SendDropdown from '../SendDropdown';
import StatisticsButton from '../StatisticsButton';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className='container'>
                <h1 className={styles.title}>EZtoque</h1>
                <div className={styles.buttonsArea}>
                    <SendDropdown />
                    <StatisticsButton />
                    <DownloadButton />
                    <LoadButton />
                </div>
                <div></div>
            </div>
        </header>
    );
}
