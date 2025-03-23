import { Link, useNavigate } from 'react-router-dom';
import styles from './Pricing.module.css';
import useAuth from '../../../../hooks/useAuth';

export default function PricingSection() {
    const { setGuest } = useAuth();
    const navigate = useNavigate();

    const continueAsGuest = () => {
        setGuest(true);
        localStorage.setItem('guest-user', 'true');
        navigate('/app');
    };

    return (
        <section id='pricing' className={styles.pricing}>
            <div className={styles.header}>
                <h2 className={styles.title}>Planos</h2>
            </div>

            <div className={styles.plans}>
                <div className={styles.plan}>
                    <h3 className={styles.planName}>Grátis</h3>
                    <div className={styles.planPrice}>
                        <span className={styles.price}>R$0</span>
                    </div>
                    <p className={styles.planDescription}>
                        Para uso básico. Sem acesso a uma conta seus dados serão
                        armazenados no seu dispositivo, o que pode resultar em
                        perdas.
                    </p>
                    <ul className={styles.features}>
                        <li className={styles.feature}>
                            <i className='bi bi-check-lg text-blue' />
                            <span>
                                Criação e comunicação de lista ilimitada
                            </span>
                        </li>
                        <li className={styles.feature}>
                            <i className='bi bi-x-lg text-red' />
                            <span>Sem acesso a uma conta</span>
                        </li>
                        <li className={styles.feature}>
                            <i className='bi bi-x-lg text-red' />
                            <span>Sem registros</span>
                        </li>
                    </ul>
                    <button
                        type='button'
                        className='btn btn-blue'
                        onClick={continueAsGuest}>
                        <i className='bi bi-person-fill-x' />
                        &nbsp;Continuar sem conta
                    </button>
                </div>
                <div className={styles.plan}>
                    <h3 className={styles.planName}>Pro</h3>
                    <div className={styles.planPrice}>
                        <span className={styles.price}>R$8</span>
                        <span className={styles.period}>/Mês</span>
                    </div>
                    <p className={styles.planDescription}>
                        Seus dados serão armazenados na nuvem e você terá acesso
                        a registros das movimentações dos seus itens.
                    </p>
                    <ul className={styles.features}>
                        <li className={styles.feature}>
                            <i className='bi bi-check-lg text-blue' />
                            <span>
                                Acesso ilimitado a todas as funcionalidades
                            </span>
                        </li>
                        <li className={styles.feature}>
                            <i className='bi bi-check-lg text-blue' />
                            <span>Dados armazenados na nuvem</span>
                        </li>
                    </ul>
                    <Link to='/signup' className='btn btn-blue'>
                        <i className='bi-person-plus-fill' />
                        &nbsp;Criar conta
                    </Link>
                </div>
            </div>
        </section>
    );
}
