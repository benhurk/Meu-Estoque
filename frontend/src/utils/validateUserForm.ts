import { Errors, UserFormType } from '../types/UserFormTypes';

export default function validateUserForm(
    fields: UserFormType,
    mode: 'login' | 'register',
    setErrors: React.Dispatch<React.SetStateAction<Errors>>
) {
    const newErrors: Errors = {};

    if (!fields.username) {
        newErrors.username = 'O nome não pode ficar em branco.';
    } else if (fields.username.length < 3 || fields.username.length > 20) {
        newErrors.username = 'O nome deve ter entre 3 e 20 caracteres.';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(fields.username)) {
        newErrors.username = 'O nome só pode conter letras, números e hífens.';
    }

    if (!fields.password) {
        newErrors.password = 'A senha não pode ficar em branco.';
    } else if (fields.password.length < 8 || fields.password.length > 30) {
        newErrors.password = 'A senha deve ter entre 8 e 30 caracteres.';
    }

    if (mode === 'register') {
        if (!fields.email) {
            newErrors.email = 'O email não pode ficar em branco.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
            newErrors.email = 'Email inválido.';
        }

        if (!fields.passwordConfirm) {
            newErrors.passwordConfirm = 'Confirme a sua senha.';
        } else if (fields.passwordConfirm !== fields.password) {
            newErrors.passwordConfirm = 'As senhas não batem.';
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}
