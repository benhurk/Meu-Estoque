import { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';

import styles from './FeatureText.module.css';

const TEXTS: string[] = [
    'Rapidamente crie, edite e cheque às alterações dos seus itens.',
    'Comunique sua lista por Whatsapp, Telegram ou Email com poucos cliques.',
    'Gere um pdf dos seus registros com 1 clique.',
];

const ICONS: string[] = [
    'bi bi-card-checklist',
    'bi bi-send-check-fill',
    'bi bi-filetype-pdf',
];

export default function FeatureText() {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length),
            4000
        );
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <h3 className={styles.text}>
            <TextTransition springConfig={presets.stiff}>
                <div className='text-blue'>
                    <i className={ICONS[index]} /> {TEXTS[index]}
                </div>
            </TextTransition>
        </h3>
    );
}
