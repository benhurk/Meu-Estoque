import { Link } from 'react-router-dom';
import UserForm from '../UserForm';

import styles from '../../pages/UserAccess/UserAccess.module.css';

export default function LoginMenu() {
    return (
        <div>
            <div className={styles.redirectLink}>
                Ainda não possui uma conta?&nbsp;
                <Link to='/signup' className='text-blue'>
                    <i className='bi bi-box-arrow-in-right' />
                    &nbsp;Registre-se
                </Link>
            </div>
            <UserForm mode='login' />
        </div>
    );
}
