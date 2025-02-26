import { Link, useLocation } from 'react-router-dom';
import styles from './UserAccess.module.css';

import Header from '../../components/Header';
import UserForm from '../../components/UserForm';
import LoginMenu from '../../components/LoginMenu';

export default function UserAccess() {
    const location = useLocation();

    return (
        <>
            <Header />
            <main className='container'>
                {location.pathname === '/signin' && (
                    <>
                        <LoginMenu />
                    </>
                )}

                {location.pathname === '/signup' && (
                    <>
                        <h2 className={styles.title}>
                            <i className='bi bi-person-plus-fill' />
                            &nbsp;Criar conta
                        </h2>
                        <div className={styles.redirectLink}>
                            Já possui uma conta?&nbsp;
                            <Link to='/signin' className='text-blue'>
                                <i className='bi bi-box-arrow-in-right' />
                                &nbsp;Entrar
                            </Link>
                        </div>
                        <UserForm mode='register' />
                    </>
                )}
            </main>
        </>
    );
}
