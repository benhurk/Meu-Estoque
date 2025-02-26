import { Link } from 'react-router-dom';

import styles from './LogsPage.module.css';

import Header from '../../components/Header';
import LogsTable from '../../components/LogsTable';

export default function LogsPage() {
    return (
        <>
            <Header />
            <main className='container'>
                <Link to='/' className={`btn-link ${styles.backLink}`}>
                    <i className='bi bi-chevron-left' />
                    &nbsp;Voltar à lista
                </Link>
                <LogsTable />
            </main>
        </>
    );
}
