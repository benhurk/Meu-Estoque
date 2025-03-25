import { useNavigate } from 'react-router-dom';
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
            <div className={styles.plans}>
                <div className={styles.plan}>
                    <h3 className={styles.planName}>Grátis</h3>
                    <div className={styles.planPrice}>
                        <span className={styles.price}>R$0</span>
                    </div>
                    <p className={styles.planDescription}>
                        Essa aplicação é um projeto pessoal.
                    </p>
                    <ul className={styles.features}>
                        <li className={styles.feature}>
                            <i className='bi bi-check-lg text-blue' />
                            <span>
                                Acesso gratuito ilimitado a todas as
                                funcionalidades.
                            </span>
                        </li>
                    </ul>
                    <button
                        type='button'
                        className='btn btn-blue'
                        onClick={continueAsGuest}>
                        <i className='bi bi-box-arrow-in-right' />
                        &nbsp;Acessar app
                    </button>
                </div>
            </div>
        </section>
    );
}
