import styles from './Header.module.css';

import DownloadButton from '../DownloadButton';
import LoadButton from '../LoadButton';
import SendDropdown from '../SendDropdown';
import StatisticsButton from '../StatisticsButton';
import Dropdown from '../Dropdown';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className='container'>
                <h1 className={styles.title}>EZtoque</h1>
                <div className={styles.buttonsArea}>
                    <SendDropdown />
                    <StatisticsButton />
                    <Dropdown
                        buttonColorClass='btn-light'
                        buttonIconClass='bi-three-dots-vertical'>
                        <li>
                            <DownloadButton />
                        </li>
                        <li>
                            <LoadButton />
                        </li>
                    </Dropdown>
                </div>
                <div></div>
            </div>
        </header>
    );
}
