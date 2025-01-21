import styles from './TextTooltip.module.css';

type Props = {
    classNames?: string;
    text: string;
};

export default function TextTooltip({ classNames, text }: Props) {
    return (
        <div className={`${classNames}`} tabIndex={0}>
            <i
                className={`bi bi-info-circle-fill ${styles.icon}`}
                tabIndex={0}
            />
            <div className={styles.tooltip}>{text}</div>
        </div>
    );
}
