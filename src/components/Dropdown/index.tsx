import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

type Props = {
    buttonText?: string;
    buttonColorClass: string;
    buttonIconClass?: string;
    dropdownArrowIcon?: boolean;
    children: ReactNode;
};

export default function Dropdown({
    buttonText,
    buttonColorClass,
    buttonIconClass,
    dropdownArrowIcon = true,
    children,
}: Props) {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownMenuRef = useRef<HTMLUListElement>(null);

    const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (e.currentTarget && !e.currentTarget.contains(e.relatedTarget)) {
            setOpenDropdown(false);
        }
    };

    const handleMenuClick = (
        e: React.MouseEvent<HTMLUListElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setOpenDropdown(false);
    };

    useEffect(() => {
        if (
            openDropdown &&
            triggerButtonRef.current &&
            dropdownMenuRef.current
        ) {
            const buttonRect = triggerButtonRef.current.getBoundingClientRect();
            const menuRect = dropdownMenuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            if (buttonRect.left + menuRect.width > viewportWidth) {
                dropdownMenuRef.current.setAttribute('style', 'right: 0');
            } else {
                dropdownMenuRef.current.setAttribute('style', 'left: 0');
            }
        }
    }, [openDropdown]);

    return (
        <div
            tabIndex={0}
            onBlur={(e) => handleBlur(e)}
            className={styles.wraper}>
            <button
                ref={triggerButtonRef}
                type='button'
                className={`btn ${buttonColorClass} ${styles.triggerButton}`}
                onClick={() => setOpenDropdown(!openDropdown)}>
                {buttonIconClass && <i className={`bi ${buttonIconClass}`} />}
                {buttonText && <>&nbsp; {buttonText}</>}
                {dropdownArrowIcon && (
                    <>
                        <div className={styles.iconSpacer} />
                        <i className='dropdown-icon bi bi-chevron-down' />
                    </>
                )}
            </button>
            <ul
                ref={dropdownMenuRef}
                className={`${styles.dropdownMenu} ${
                    openDropdown ? styles.open : ''
                }`}
                onClick={handleMenuClick}>
                {children}
            </ul>
        </div>
    );
}
