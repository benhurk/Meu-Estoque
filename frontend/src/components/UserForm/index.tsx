import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserForm.module.css';

import { UserFormType, Errors } from '../../types/UserFormTypes';
import FormGroup from '../FormGroup';
import useAuth from '../../hooks/useAuth';
import { ClipLoader } from 'react-spinners';
import validateUserForm from '../../utils/validateUserForm';

const initialForm: UserFormType = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
};

type Props = {
    mode: 'login' | 'register';
};

export default function UserForm({ mode }: Props) {
    const [fields, setFields] = useState<UserFormType>(initialForm);
    const [errors, setErrors] = useState<Errors>({});
    const [responseMessage, setResponseMessage] = useState({
        success: false,
        message: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const { login, register, setGuest } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields({
            ...fields,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestFn =
            mode === 'login'
                ? login(fields.username, fields.password)
                : register(fields.username, fields.email, fields.password);

        if (validateUserForm(fields, mode, setErrors)) {
            setLoading(true);

            const res = await requestFn;

            setLoading(false);
            setResponseMessage(res);
        }
    };

    const continueAsGuest = () => {
        navigate('/app');
        setGuest(true);
        localStorage.setItem('guest-user', 'true');
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
                    maxLength={20}
                    type='text'
                    className='input'
                    placeholder='Seu nome'
                    onChange={handleChange}
                />
            </FormGroup>

            {mode === 'register' && (
                <FormGroup
                    elementId='email-field'
                    labelText='Email:'
                    error={errors.email}>
                    <input
                        id='email-field'
                        name='email'
                        type='text'
                        maxLength={100}
                        className='input'
                        placeholder='exemplo@email.com'
                        onChange={handleChange}
                    />
                </FormGroup>
            )}

            <FormGroup
                elementId='password-field'
                labelText='Senha:'
                error={errors.password}>
                <input
                    id='password-field'
                    name='password'
                    type='password'
                    maxLength={30}
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
                        maxLength={30}
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
                    <>
                        <button type='submit' className='btn btn-blue'>
                            <i
                                className={`bi ${
                                    mode === 'login'
                                        ? 'bi-box-arrow-in-right'
                                        : 'bi-person-plus-fill'
                                }`}
                            />
                            &nbsp;{mode === 'login' ? 'Entrar' : 'Criar conta'}
                        </button>
                        <button
                            type='button'
                            className='btn btn-dark'
                            onClick={continueAsGuest}>
                            <i className='bi bi-person-fill-x' />
                            &nbsp;Continuar sem conta
                        </button>
                    </>
                ) : (
                    <ClipLoader />
                )}
            </div>
        </form>
    );
}
