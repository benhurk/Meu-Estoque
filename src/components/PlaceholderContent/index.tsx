import styles from './PlaceholderContent.module.css';

type Props = {
    text: string;
};

export default function PlaceholderContent({ text }: Props) {
    return (
        <div className={styles.placeholderContent}>
            <i className={`bi bi-clipboard-x ${styles.icon}`} />
            <span>{text}</span>
        </div>
    );
}
