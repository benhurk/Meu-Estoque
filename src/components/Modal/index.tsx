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
                            className='btn-close position-absolute top-0 end-0 mt-1 me-1'
                            onClick={() => setIsOpen(false)}
                        />
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        );
    } else return false;
}
