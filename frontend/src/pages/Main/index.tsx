import { useEffect } from 'react';

import Header from '../../components/Header';
import List from '../../components/List';
import useAuth from '../../hooks/useAuth';
import useListStore from '../../stores/listStore';
import api from '../../api';
import LoginMenu from '../../components/LoginMenu';
import Loader from '../../components/Loader';
import keysToCamelCase from '../../utils/snakeToCamel';

export default function MainPage() {
    const { accessToken, guest } = useAuth();
    const setListData = useListStore((state) => state.setListData);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get('/items');
                setListData(keysToCamelCase(res.data.userItems));
            } catch {
                return;
            }
        };

        if (!guest) fetchUserData();
    }, [accessToken, guest, setListData]);

    return (
        <>
            <Header />
            <main className='container'>
                {accessToken === undefined && !guest && <Loader />}
                {accessToken === null && !guest && <LoginMenu />}
                {(guest || accessToken) && <List />}
            </main>
        </>
    );
}
