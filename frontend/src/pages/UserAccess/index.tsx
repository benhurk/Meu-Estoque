import { useLocation } from 'react-router-dom';

import LoginMenu from '../../components/LoginMenu';
import FeatureText from '../../components/FeatureText';
import RegisterMenu from '../../components/RegisterMenu';

export default function UserAccess() {
    const location = useLocation();

    return (
        <main className='container'>
            <FeatureText />

            {location.pathname === '/signin' && <LoginMenu />}
            {location.pathname === '/signup' && <RegisterMenu />}
        </main>
    );
}
