import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import styles from './LogsPage.module.css';

import Header from '../../components/Header';
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
        <>
            <Header />
            <main className='container'>
                <Link to='/app' className={`btn-link ${styles.backLink}`}>
                    <i className='bi bi-chevron-left' />
                    &nbsp;Voltar à lista
                </Link>
                <LogsTable />
            </main>
        </>
    );
}
