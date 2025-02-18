import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

import DownloadButton from '../DownloadButton';
import LoadButton from '../LoadButton';
import SendDropdown from '../SendDropdown';
import StatisticsButton from '../StatisticsButton';
import Dropdown from '../Dropdown';
import useAuth from '../../hooks/useAuth';

export default function Header() {
    const { accessToken, guest, logout } = useAuth();

    const navigate = useNavigate();
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

                {accessToken && (
                    <button
                        type='button'
                        className='btn btn-link'
                        style={{
                            marginInline: 'auto',
                        }}
                        onClick={logout}>
                        <i className='bi bi-box-arrow-left' />
                        &nbsp;Sair
                    </button>
                )}

                {guest && location.pathname === '/' && (
                    <button
                        type='button'
                        className='btn btn-link'
                        style={{
                            marginInline: 'auto',
                        }}
                        onClick={() => navigate('/signin')}>
                        <i className='bi bi-box-arrow-right' />
                        &nbsp;Entrar
                    </button>
                )}
            </div>
        </header>
    );
}
