import { Link } from 'react-router-dom';

import styles from '../../pages/UserAccess/UserAccess.module.css';
import planStyles from '../../pages/Landing/Sections/Pricing/Pricing.module.css';

import UserForm from '../UserForm';

export default function RegisterMenu() {
    return (
        <>
            <div>
                <h2 className={styles.title}>
                    <i className='bi bi-person-plus-fill' />
                    &nbsp;Criar conta PRO
                </h2>
                <div
                    className={planStyles.planPrice}
                    style={{ justifyContent: 'center' }}>
                    <span className={planStyles.price}>R$8</span>
                    <span className={planStyles.period}>/Mês</span>
                </div>
                <div className={styles.redirectLink}>
                    Já possui uma conta?&nbsp;
                    <Link to='/signin' className='text-blue'>
                        <i className='bi bi-box-arrow-in-right' />
                        &nbsp;Entrar
                    </Link>
                </div>
                <UserForm mode='register' />
            </div>
        </>
    );
}
