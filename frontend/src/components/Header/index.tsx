import styles from './Header.module.css';

import DownloadButton from '../DownloadButton';
import LoadButton from '../LoadButton';
import SendDropdown from '../SendDropdown';
import StatisticsButton from '../StatisticsButton';
import Dropdown from '../Dropdown';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className='container'>
                <Link to='/' className={styles.title}>
                    <h1>EZtoque</h1>
                </Link>

                {location.pathname === '/' && (
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
                )}
            </div>
        </header>
    );
}
