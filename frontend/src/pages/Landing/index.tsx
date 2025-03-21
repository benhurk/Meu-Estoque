import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

import appDemoImg from '../../assets/app_demo.png';
import clickSvg from '../../assets/click-svg.svg';
import chatSvg from '../../assets/wpp-svg.svg';
import statisticsSvg from '../../assets/statistics-svg.svg';
import pdfSvg from '../../assets/pdf-svg.svg';
import userSvg from '../../assets/user-svg.svg';

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
            <div className={styles.introductionArea}>
                <div>
                    <div className={styles.introductionText}>
                        <p className={styles.slogan}>
                            Mantenha e comunique sua lista de{' '}
                            <strong>estoque</strong> de forma{' '}
                            <strong>fácil e rápida.</strong>
                        </p>
                        <p className={styles.description}>
                            <strong>Meu Estoque</strong> é uma aplicação feita
                            pra auxiliar na organização e comunicação
                            relacionada a itens do trabalho.
                        </p>
                    </div>
                    <Link className='btn btn-dark' to='/signup'>
                        <i className='bi bi-box-arrow-in-right' />
                        &nbsp;Acessar o app
                    </Link>
                </div>

                <img
                    src={appDemoImg}
                    alt='O app funcionando em um celular'
                    className={styles.demoImg}
                />
            </div>

            <div className={styles.cardArea}>
                <div className={styles.card}>
                    <div className={styles.cardIllustration}>
                        <img src={clickSvg} className={styles.cardSvg} />
                        <i className='bi bi-arrow-right-short' />
                        <img src={chatSvg} className={styles.cardSvg} />
                    </div>
                    <span className={styles.cardText}>
                        Encaminhe sua lista por{' '}
                        <strong className='text-blue'>Whatsapp</strong>,{' '}
                        <strong className='text-blue'>Telegram</strong> ou{' '}
                        <strong className='text-blue'>Email</strong> com poucos
                        cliques.
                    </span>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardIllustration}>
                        <img src={statisticsSvg} className={styles.cardSvg} />
                        <i className='bi bi-arrow-right-short' />
                        <img src={pdfSvg} className={styles.cardSvg} />
                    </div>
                    <span className={styles.cardText}>
                        Gere um <strong className='text-blue'>pdf</strong> dos
                        seus registros com um clique.
                    </span>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardIllustration}>
                        <img src={userSvg} className={styles.cardSvg} />
                        <i className='bi bi-share-fill' />
                        <img src={userSvg} className={styles.cardSvg} />
                    </div>
                    <span className={styles.cardText}>
                        Compartilhe seus dados com colegas.
                    </span>
                </div>
            </div>
        </main>
    );
}
