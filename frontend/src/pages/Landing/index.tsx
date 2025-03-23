import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

import appDemoImg from '../../assets/app_demo.png';
import PricingSection from './Sections/Pricing';
import FeaturesSection from './Sections/Fetures';

export default function LandingPage() {
    const { isLoading, accessToken, guest } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && (accessToken || guest)) {
            navigate('/app');
        }
    }, [accessToken, guest, isLoading, navigate]);

    return (
        <main className='container'>
            <section className={styles.hero}>
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        Simplifique sua{' '}
                        <span className={styles.highlight}>
                            gestão de estoque
                        </span>
                    </h2>
                    <p className={styles.subtitle}>
                        Uma solução intuitiva para facilitar a gestão e a
                        comunicação de estoque no ambiente de trabalho. Mantenha
                        a contagem, monitore as alterações e comunique sua lista
                        rapidamente.
                    </p>
                    <div className={styles.cta}>
                        <Link to='/signup' className='btn btn-blue'>
                            <i className='bi-person-plus-fill' />
                            &nbsp;Criar conta
                        </Link>
                        <Link to='/signin' className='btn btn-dark'>
                            <i className='bi bi-box-arrow-in-right' />
                            &nbsp;Entrar
                        </Link>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img src={appDemoImg} className={styles.heroImage} />
                </div>
            </section>
            <FeaturesSection />
            <PricingSection />
        </main>
    );
}
