import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import List from '../../components/List';
import useAuth from '../../hooks/useAuth';
import useListStore from '../../stores/userDataStore';
import api from '../../api';
import LoginMenu from '../../components/LoginMenu';
import Loader from '../../components/Loader';
import keysToCamelCase from '../../utils/snakeToCamel';

export default function MainPage() {
    const { accessToken, guest } = useAuth();
    const setUserItems = useListStore((state) => state.setUserItems);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                setLoading(true);

                const res = await api.get('/items');
                setUserItems(keysToCamelCase(res.data.userItems));
            } catch {
                console.log('Algo deu errado tente novamente.');
            }
            setLoading(false);
        };

        if (!guest) fetchUserItems();
    }, [accessToken, guest, setUserItems]);

    return (
        <>
            <Header />
            <main className='container'>
                {accessToken === undefined && !guest && <Loader />}
                {accessToken === null && !guest && <LoginMenu />}
                {(guest || accessToken) && (loading ? <Loader /> : <List />)}
            </main>
        </>
    );
}
