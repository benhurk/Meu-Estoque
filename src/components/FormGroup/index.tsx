import { ReactNode } from 'react';
import styles from './FormGroup.module.css';

type Props = {
    elementId: string;
    labelText: string;
    error?: string;
    children: ReactNode;
};

export default function FormGroup({
    elementId,
    labelText,
    error,
    children,
}: Props) {
    return (
        <div>
            <label htmlFor={elementId} className={styles.labelText}>
                {labelText}
            </label>
            {children}
            {error && <small className='text-red'>{error}</small>}
        </div>
    );
}
