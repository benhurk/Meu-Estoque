import { ReactNode, useState } from 'react';
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

    return (
        <div tabIndex={0} onBlur={(e) => handleBlur(e)}>
            <button
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
            {openDropdown && (
                <ul className={styles.dropdownMenu} onClick={handleMenuClick}>
                    {children}
                </ul>
            )}
        </div>
    );
}
