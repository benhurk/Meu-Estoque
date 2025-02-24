import { Bounce, toast } from 'react-toastify';

export function triggerErrorToast(message: string) {
    toast.error(message, {
        position: 'bottom-center',
        autoClose: 5000,
        theme: 'colored',
        transition: Bounce,
    });
}
