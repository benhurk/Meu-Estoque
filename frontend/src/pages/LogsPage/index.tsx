import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import styles from './LogsPage.module.css';
import planStyles from '../Landing/Sections/Pricing/Pricing.module.css';

import LogsTable from '../../components/LogsTable';

export default function LogsPage() {
    const { accessToken, guest, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !accessToken && !guest) {
            navigate('/signin');
        }
    }, [accessToken, guest, isLoading, navigate]);

    return (
        <main className='container'>
            <Link to='/app' className={`btn-link ${styles.backLink}`}>
                <i className='bi bi-chevron-left' />
                &nbsp;Voltar à lista
            </Link>
            {accessToken ? (
                <LogsTable />
            ) : (
                <div
                    className={planStyles.plan}
                    style={{ marginInline: 'auto' }}>
                    <h3 className={planStyles.planName}>Pro</h3>
                    <div className={planStyles.planPrice}>
                        <span className={planStyles.price}>R$8</span>
                        <span className={planStyles.period}>/Mês</span>
                    </div>
                    <p className={planStyles.planDescription}>
                        Seus dados serão armazenados na nuvem e você terá acesso
                        a registros das movimentações dos seus itens.
                    </p>
                    <ul className={planStyles.features}>
                        <li className={planStyles.feature}>
                            <i className='bi bi-check-lg text-blue' />
                            <span>
                                Acesso ilimitado a todas as funcionalidades
                            </span>
                        </li>
                        <li className={planStyles.feature}>
                            <i className='bi bi-check-lg text-blue' />
                            <span>Dados armazenados na nuvem</span>
                        </li>
                    </ul>
                    <Link to='/signup' className='btn btn-blue'>
                        <i className='bi-person-plus-fill' />
                        &nbsp;Criar conta
                    </Link>
                </div>
            )}
        </main>
    );
}
