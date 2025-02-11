import { useState } from 'react';

type UserForm = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export type Errors = {
    username?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
};

const initialForm: UserForm = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
};

export default function useUserForm() {
    const [fields, setFields] = useState<UserForm>(initialForm);
    const [errors, setErrors] = useState<Errors>({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const validate = () => {
        const newErrors: Errors = {};

        if (!fields.username) {
            newErrors.username = 'O nome não pode ficar em branco.';
        }

        if (!fields.email) {
            newErrors.email = 'Email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
            newErrors.email = 'Email inválido.';
        }

        if (!fields.password) {
            newErrors.password = 'A senha não pode ficar em branco.';
        }

        if (!fields.passwordConfirm) {
            newErrors.passwordConfirm = 'Confirme a sua senha.';
        } else if (fields.passwordConfirm !== fields.password) {
            newErrors.passwordConfirm = 'As senhas não batem.';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    return { fields, setFields, validate, errors };
}
