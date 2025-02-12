import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import UserForm from '../../components/UserForm';

import styles from './UserAccess.module.css';

export default function UserAccess() {
    const location = useLocation();

    return (
        <>
            <Header />
            <main className='container'>
                {location.pathname === '/signin' && (
                    <>
                        <div className={styles.redirectLink}>
                            Ainda não possui uma conta?&nbsp;
                            <Link to='/signup' className='text-blue'>
                                <i className='bi bi-box-arrow-in-right' />
                                &nbsp;Registre-se
                            </Link>
                        </div>
                        <UserForm mode='login' />
                    </>
                )}

                {location.pathname === '/signup' && (
                    <>
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
