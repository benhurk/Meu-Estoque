import axios from 'axios';

export default function handleApiErrors(
    error: unknown,
    setError: React.Dispatch<React.SetStateAction<string>>
) {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            if (error.response.status != 401 && error.response.status != 403) {
                setError('Ocorreu um problema no servidor, tente novamente.');
            }
        } else {
            setError(
                'Falha na conexão. Verifique sua internet e tente novamente.'
            );
        }
    } else {
        setError('Erro inesperado. Tente novamente mais tarde.');
    }
}
