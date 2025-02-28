import { Bounce, toast } from 'react-toastify';

export function triggerErrorToast(message: string) {
    toast.error(message, {
        position: 'bottom-center',
        autoClose: 5000,
        pauseOnFocusLoss: false,
        theme: 'colored',
        transition: Bounce,
    });
}
