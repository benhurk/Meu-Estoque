import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import logo from '../../assets/logo.svg';

import DownloadButton from '../DownloadButton';
import LoadButton from '../LoadButton';
import SendDropdown from '../SendDropdown';
import StatisticsButton from '../StatisticsButton';
import Dropdown from '../Dropdown';
import useAuth from '../../hooks/useAuth';

export default function Header() {
    const { accessToken, guest, logout } = useAuth();

    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className='container'>
                <Link to='/' className={styles.title}>
                    <img src={logo} alt='logo' />
                    <h1>Meu Estoque</h1>
                </Link>

                {(accessToken || guest) && (
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

                {guest &&
                    (location.pathname === '/' ||
                        location.pathname === '/logs') && (
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
