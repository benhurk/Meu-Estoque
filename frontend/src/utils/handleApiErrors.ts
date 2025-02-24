/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from 'axios';

export default function handleApiErrors(error: unknown, fn: Function) {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            if (error.response.status != 401 && error.response.status != 403) {
                fn('Ocorreu um problema no servidor, tente novamente.');
            }
        } else {
            fn('Falha na conexão. Verifique sua internet e tente novamente.');
        }
    } else {
        fn('Erro inesperado. Tente novamente.');
    }
}
