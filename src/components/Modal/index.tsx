import styles from './Modal.module.css';
import { ReactNode } from 'react';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
};

export default function Modal({ isOpen, setIsOpen, children }: Props) {
    if (isOpen) {
        return (
            <div className={styles.modalContainer} id='modal'>
                <div
                    className={styles.modalBg}
                    onClick={() => setIsOpen(false)}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            type='button'
                            className={`bi bi-x-lg ${styles.closeButton}`}
                            onClick={() => setIsOpen(false)}
                        />
                        {children}
                    </div>
                </div>
            </div>
        );
    } else return false;
}
