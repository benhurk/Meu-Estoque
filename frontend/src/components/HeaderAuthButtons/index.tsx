import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function HeaderAuthButtons() {
    const { accessToken, guest, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            {accessToken && (
                <button
                    type='button'
                    className='btn btn-link'
                    style={{
                        marginInline: 'auto',
                    }}
                    onClick={logout}>
                    <i className='bi bi-box-arrow-left' />
                    &nbsp;Sair
                </button>
            )}

            {guest && (
                <button
                    type='button'
                    className='btn btn-link'
                    style={{
                        marginInline: 'auto',
                    }}
                    onClick={() => navigate('/signup')}>
                    <i className='bi bi-person-plus-fill' />
                    &nbsp;Criar conta
                </button>
            )}
        </>
    );
}
