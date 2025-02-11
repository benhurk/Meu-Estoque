import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.css';

import AuthProvider from './contexts/AuthProvider';
import MainPage from './pages/Main';
import SignIn from './pages/SignIn';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/' element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
