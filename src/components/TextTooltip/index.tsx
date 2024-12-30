import styles from './TextTooltip.module.css';

type Props = {
    classNames?: string,
    bootstrapIconClass: string;
    text: string
}

export default function TextTooltip({ classNames, bootstrapIconClass, text }: Props) {
    return (
        <div className={`${classNames}`}>
            <i className={`${bootstrapIconClass} ${styles.icon}`} />
            <div className={styles.tooltip}>
                { text }
            </div>
        </div>
    )
}