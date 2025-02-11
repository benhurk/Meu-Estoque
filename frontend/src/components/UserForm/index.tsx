import { useState } from 'react';
import styles from './UserForm.module.css';

import useUserForm from '../../hooks/useUserForm';
import useAuth from '../../hooks/useAuth';
import { ClipLoader } from 'react-spinners';
import RegisterForm from './RegisterForm';

export default function UserForm() {
    const [requestMessage, setRequestMessage] = useState({
        success: false,
        message: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const { fields, setFields, validate, errors } = useUserForm();

    const { register } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields({
            ...fields,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true);

            const tryRegister = await register(
                fields.username,
                fields.email,
                fields.password
            );

            setLoading(false);
            setRequestMessage(tryRegister);
        }
    };

    return (
        <form className={styles.wraper} onSubmit={handleSubmit}>
            <RegisterForm handleChange={handleChange} errors={errors} />
            {requestMessage && (
                <small
                    className={`
                        ${styles.requestMessage}
                        ${
                            requestMessage.success === true
                                ? 'text-green'
                                : 'text-red'
                        }
                    `}>
                    {requestMessage.message}
                </small>
            )}
            <div className={styles.buttonArea}>
                {!loading ? (
                    <button type='submit' className='btn btn-green'>
                        <i className='bi bi-box-arrow-in-right' />
                        &nbsp;Registrar-se
                    </button>
                ) : (
                    <ClipLoader color='' />
                )}
            </div>
        </form>
    );
}
