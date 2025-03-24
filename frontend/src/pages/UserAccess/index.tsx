import { useLocation } from 'react-router-dom';

import LoginMenu from '../../components/LoginMenu';
import RegisterMenu from '../../components/RegisterMenu';

export default function UserAccess() {
    const location = useLocation();

    return (
        <main className='container'>
            {location.pathname === '/signin' && <LoginMenu />}
            {location.pathname === '/signup' && <RegisterMenu />}
        </main>
    );
}
