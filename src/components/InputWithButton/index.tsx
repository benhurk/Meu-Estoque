import { useState } from 'react';
import styles from './InputWithButton.module.css';

type Props = {
    onButtonClick: (inputValue: string) => void;
    buttonIconClass: string;
    getErrors?: (inputValue: string) => string;
    inputId?: string;
    placeholderText?: string;
    clearAfter?: boolean;
    clearBtn?: () => void;
};

export default function InputWithButton({
    onButtonClick,
    buttonIconClass,
    getErrors,
    inputId,
    placeholderText,
    clearAfter = true,
    clearBtn,
}: Props) {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleButtonClick = () => {
        if (getErrors && getErrors(value)) {
            setError(getErrors(value));
        } else {
            onButtonClick(value);
            setError('');

            if (clearAfter) {
                setValue('');
            }
        }
    };

    const clear = () => {
        setValue('');
        if (clearBtn) clearBtn();
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputWraper}>
                <div>
                    <input
                        id={inputId}
                        className='input'
                        type='text'
                        placeholder={placeholderText}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {clearBtn && (
                        <button
                            type='button'
                            className={`btn-remove-item bi bi-x-lg ${styles.clearButton}`}
                            onClick={clear}
                        />
                    )}
                </div>
                <button
                    type='submit'
                    className={`btn btn-dark bi ${buttonIconClass}`}
                    onClick={handleButtonClick}
                />
            </div>
            <small className='text-red'>{error}</small>
        </form>
    );
}
