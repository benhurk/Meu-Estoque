import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import List from '../../components/List';
import useAuth from '../../hooks/useAuth';
import useListStore from '../../stores/listStore';
import api from '../../api';
import LoginMenu from '../../components/LoginMenu';
import Loader from '../../components/Loader';

export default function MainPage() {
    const { accessToken, guest } = useAuth();
    const [unauthenticated, setUnauthenticated] = useState<boolean>(false);
    const setListData = useListStore((state) => state.setListData);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get('/items');
                setListData(res.data.userItems);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.status === 401) setUnauthenticated(true);
            }
        };

        if (!guest) fetchUserData();
    }, [guest, setListData]);

    return (
        <>
            <Header />
            <main className='container'>
                {(guest || accessToken) && <List />}
                {!accessToken && !unauthenticated && !guest && <Loader />}
                {unauthenticated && !guest && <LoginMenu />}
            </main>
        </>
    );
}
