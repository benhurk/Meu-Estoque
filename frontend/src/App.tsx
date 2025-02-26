import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.css';

import AuthProvider from './contexts/AuthContext/AuthProvider';
import MainPage from './pages/Main';
import UserAccess from './pages/UserAccess';
import LogsPage from './pages/LogsPage';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/signin' element={<UserAccess />} />
                    <Route path='/signup' element={<UserAccess />} />
                    <Route path='/' element={<MainPage />} />
                    <Route path='/logs' element={<LogsPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
