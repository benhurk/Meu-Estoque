import { Dispatch, SetStateAction } from 'react';

import OptionsList from '../OptionsList';
import InputWithButton from '../InputWithButton';

import capitalizeString from '../../utils/capitalizeString';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
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

    return (
        <>
            <InputWithButton
                onButtonClick={(inputValue: string) =>
                    setOptions((prev) => [
                        ...prev,
                        capitalizeString(inputValue),
                    ])
                }
                getErrors={(inputValue: string) => validateOptions(inputValue)}
                buttonIconClass='bi-plus-lg'
                placeholderText='Nova opção'
                inputId='item-options'
            />
            {options.length > 0 && (
                <OptionsList options={options} setOptions={setOptions} />
            )}
        </>
    );
}
