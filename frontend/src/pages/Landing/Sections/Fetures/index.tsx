import styles from './Features.module.css';

import features from '../../../../consts/features';

export default function FeaturesSection() {
    return (
        <section id='features' className={styles.features}>
            <div className={styles.grid}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.feature}>
                        <div className={styles.iconContainer}>
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                width={64}
                                height={64}
                                className={styles.icon}
                            />
                        </div>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDescription}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
