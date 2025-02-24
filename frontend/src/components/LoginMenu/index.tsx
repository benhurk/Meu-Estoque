import { Link } from 'react-router-dom';
import UserForm from '../UserForm';

import styles from '../../pages/UserAccess/UserAccess.module.css';

export default function LoginMenu() {
    return (
        <div>
            <h2 className={styles.title}>
                <i className='bi bi-person-fill' />
                &nbsp;Acessar estoque
            </h2>
            <div className={styles.redirectLink}>
                Ainda não possui uma conta?&nbsp;&nbsp;
                <Link to='/signup' className='text-blue'>
                    <i className='bi bi-person-plus-fill' />
                    &nbsp;Registre-se
                </Link>
            </div>
            <UserForm mode='login' />
        </div>
    );
}
