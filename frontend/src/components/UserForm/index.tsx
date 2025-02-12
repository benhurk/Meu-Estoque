import { useState } from 'react';
import styles from './UserForm.module.css';

import { ClipLoader } from 'react-spinners';
import UserFormType from '../../types/UserForm';
import FormGroup from '../FormGroup';
import useAuth from '../../hooks/useAuth';

type Props = {
    mode: 'login' | 'register';
};

const initialForm: UserFormType = {
    username: '',
    password: '',
    passwordConfirm: '',
};

type Errors = {
    username?: string;
    password?: string;
    passwordConfirm?: string;
};

export default function UserForm({ mode }: Props) {
    const [fields, setFields] = useState<UserFormType>(initialForm);
    const [errors, setErrors] = useState<Errors>({});
    const [responseMessage, setResponseMessage] = useState({
        success: false,
        message: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const { login, register } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields({
            ...fields,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors: Errors = {};

        if (!fields.username) {
            newErrors.username = 'O nome não pode ficar em branco.';
        }

        if (!fields.password) {
            newErrors.password = 'A senha não pode ficar em branco.';
        }

        if (mode === 'register') {
            if (!fields.passwordConfirm) {
                newErrors.passwordConfirm = 'Confirme a sua senha.';
            } else if (fields.passwordConfirm !== fields.password) {
                newErrors.passwordConfirm = 'As senhas não batem.';
            }
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestFn = mode === 'login' ? login : register;

        if (validate()) {
            setLoading(true);

            const res = await requestFn(fields.username, fields.password);

            setLoading(false);
            setResponseMessage(res);
        }
    };

    return (
        <form className={styles.wraper} onSubmit={(e) => handleSubmit(e)}>
            <FormGroup
                elementId='username-field'
                labelText='Nome de usuário:'
                error={errors.username}>
                <input
                    id='username-field'
                    name='username'
                    type='text'
                    className='input'
                    placeholder='Seu nome'
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup
                elementId='password-field'
                labelText='Senha:'
                error={errors.password}>
                <input
                    id='password-field'
                    name='password'
                    type='password'
                    className='input'
                    placeholder='Sua senha'
                    onChange={handleChange}
                />
            </FormGroup>
            {mode === 'register' && (
                <FormGroup
                    elementId='confirm-password-field'
                    labelText='Confirmar senha:'
                    error={errors.passwordConfirm}>
                    <input
                        id='confirm-password-field'
                        name='passwordConfirm'
                        type='password'
                        className='input'
                        placeholder='Digite sua senha novamente'
                        onChange={handleChange}
                    />
                </FormGroup>
            )}

            {responseMessage && (
                <small
                    className={`
                        ${styles.responseMessage}
                        ${
                            responseMessage.success === true
                                ? 'text-green'
                                : 'text-red'
                        }
                    `}>
                    {responseMessage.message}
                </small>
            )}
            <div className={styles.buttonArea}>
                {!loading ? (
                    <button type='submit' className='btn btn-green'>
                        <i className='bi bi-box-arrow-in-right' />
                        &nbsp;{mode === 'login' ? 'Entrar' : 'Criar conta'}
                    </button>
                ) : (
                    <ClipLoader />
                )}
            </div>
        </form>
    );
}
