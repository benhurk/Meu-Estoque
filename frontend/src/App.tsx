import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.css';

import AuthProvider from './contexts/AuthContext/AuthProvider';

import LandingPage from './pages/Landing';
import MainPage from './pages/Main';
import UserAccess from './pages/UserAccess';
import LogsPage from './pages/LogsPage';

import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/signin' element={<UserAccess />} />
                    <Route path='/signup' element={<UserAccess />} />
                    <Route path='/app' element={<MainPage />} />
                    <Route path='/app/logs' element={<LogsPage />} />
                </Routes>
                <ToastContainer />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
