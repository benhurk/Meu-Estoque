import { useEffect, useState } from 'react';

import Header from '../components/Header';
import List from '../components/List';
import useAuth from '../hooks/useAuth';
import useListStore from '../stores/listStore';
import api from '../api';
import { ClipLoader } from 'react-spinners';

export default function MainPage() {
    const { accessToken } = useAuth();
    const [unauthenticated, setUnauthenticated] = useState<boolean>(false);
    const setListData = useListStore((state) => state.setListData);

    useEffect(() => {
        const fetchListData = async () => {
            try {
                const res = await api.get('/items');
                setListData(res.data.userItems);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.status === 401) setUnauthenticated(true);
            }
        };

        fetchListData();
    }, [setListData]);

    return (
        <>
            <Header />
            <main className='container'>
                {accessToken && <List />}
                {accessToken === undefined && <ClipLoader />}
                {unauthenticated && <div>Accesse sua conta</div>}
            </main>
        </>
    );
}
