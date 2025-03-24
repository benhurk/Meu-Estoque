import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.css';
import logo from '../../assets/logo.svg';

import DownloadButton from '../DownloadButton';
import LoadButton from '../LoadButton';
import SendDropdown from '../SendDropdown';
import StatisticsButton from '../StatisticsButton';
import Dropdown from '../Dropdown';
import RemoveAllButton from '../RemoveAllButton';
import HeaderAuthButtons from '../HeaderAuthButtons';

export default function Header() {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className='container'>
                <Link to='/' className={styles.title}>
                    <img src={logo} alt='logo' />
                    <h1>Meu Estoque</h1>
                </Link>

                {(location.pathname === '/app' ||
                    location.pathname === '/app/logs') && <HeaderAuthButtons />}

                {location.pathname === '/app' && (
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
                            <li>
                                <RemoveAllButton />
                            </li>
                        </Dropdown>
                    </div>
                )}
            </div>
        </header>
    );
}
