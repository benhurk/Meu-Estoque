import styles from './AddOptionInput.module.css';

import InputWithButton from '../InputWithButton';

import capitalizeString from '../../utils/capitalizeString';

type Props = {
    options: string[];
    setOptions: (value: string[]) => void;
};

export default function AddOptionInput({ options, setOptions }: Props) {
    const validateOptions = (newOption: string) => {
        if (
            options.some(
                (item) =>
                    item.toLocaleLowerCase() === newOption.toLocaleLowerCase()
            )
        )
            return 'Essa opção já existe.';
        else if (newOption === '') return 'Dê um nome para a opção.';
        else return '';
    };

    const removeOption = (toRemove: string) => {
        setOptions(options.filter((option) => option != toRemove));
    };

    return (
        <>
            <InputWithButton
                onButtonClick={(inputValue: string) =>
                    setOptions([...options, capitalizeString(inputValue)])
                }
                getErrors={(inputValue: string) => validateOptions(inputValue)}
                buttonIconClass='bi-plus-lg'
                placeholderText='Nova opção'
                inputId='item-options'
            />
            {options.length > 0 && (
                <ol>
                    {options.map((item, index) => (
                        <li key={index} className={styles.listItem}>
                            <div>
                                <span>{`${index + 1}. `}</span>
                                <span className='text-blue'>{item}</span>
                            </div>
                            <button
                                type='button'
                                className='btn-remove-item'
                                onClick={() => removeOption(item)}>
                                <i className='bi bi-x' />
                            </button>
                        </li>
                    ))}
                </ol>
            )}
        </>
    );
}
