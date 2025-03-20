import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

import useAuth from '../../hooks/useAuth';
import useListStore from '../../stores/userDataStore';

import Header from '../../components/Header';
import List from '../../components/List';
import EmptyListContent from '../../components/EmptyListContent';
import Loader from '../../components/Loader';

import keysToCamelCase from '../../utils/snakeToCamel';
import handleApiErrors from '../../utils/handleApiErrors';
import { ToastContainer } from 'react-toastify';

export default function MainPage() {
    const { accessToken, guest, isLoading } = useAuth();
    const setUserItems = useListStore((state) => state.setUserItems);
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!isLoading && !accessToken && !guest) {
            navigate('/signin');
        }
    }, [accessToken, guest, isLoading, navigate]);

    useEffect(() => {
        const fetchUserItems = async () => {
            setLoading(true);
            try {
                const res = await api.get('/items');
                setUserItems(keysToCamelCase(res.data.userItems));
            } catch (error) {
                handleApiErrors(error, setError);
            } finally {
                setLoading(false);
            }
        };

        if (!guest) fetchUserItems();
    }, [accessToken, guest, setUserItems]);

    return (
        <>
            <Header />
            <main className='container'>
                {!error && (loading ? <Loader /> : <List />)}
                {error && (
                    <>
                        <EmptyListContent text={error} />
                        <button
                            type='button'
                            className='btn btn-dark'
                            style={{ marginInline: 'auto', marginTop: '1rem' }}
                            onClick={() => window.location.reload()}>
                            <i className='bi bi-arrow-clockwise' />
                            &nbsp;Recarregar
                        </button>
                    </>
                )}
            </main>
            <ToastContainer />
        </>
    );
}
