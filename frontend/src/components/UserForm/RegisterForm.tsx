import { Errors } from '../../hooks/useUserForm';
import FormGroup from '../FormGroup';

type Props = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: Errors;
};

export default function RegisterForm({ handleChange, errors }: Props) {
    return (
        <>
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
                elementId='email-field'
                labelText='Email:'
                error={errors.email}>
                <input
                    id='email-field'
                    name='email'
                    type='text'
                    className='input'
                    placeholder='seu@email.com'
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
                    placeholder='********'
                    onChange={handleChange}
                />
            </FormGroup>
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
        </>
    );
}
