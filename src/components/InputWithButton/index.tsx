import { useState } from 'react';
import styles from './InputWithButton.module.css';

type Props = {
    onButtonClick: (inputValue: string) => void;
    buttonIconClass: string;
    getErrors?: (inputValue: string) => string;
    inputId?: string;
    placeholderText?: string;
};

export default function InputWithButton({
    onButtonClick,
    buttonIconClass,
    getErrors,
    inputId,
    placeholderText,
}: Props) {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleButtonClick = () => {
        if (getErrors && getErrors(value)) {
            setError(getErrors(value));
        } else {
            onButtonClick(value);
            setError('');
            setValue('');
        }
    };

    return (
        <div>
            <div className={styles.inputWraper}>
                <input
                    id={inputId}
                    className='input'
                    type='text'
                    placeholder={placeholderText}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    type='button'
                    className={`btn btn-dark bi bi-plus-lg ${buttonIconClass}`}
                    onClick={handleButtonClick}
                />
            </div>
            <small className='text-red'>{error}</small>
        </div>
    );
}
