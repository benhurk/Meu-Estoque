import { Dispatch, SetStateAction } from 'react';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
    savedOptions: string[][];
    setSavedOptions: Dispatch<SetStateAction<string[][]>>;
};

export default function OptionsList({
    options,
    setOptions,
    savedOptions,
    setSavedOptions,
}: Props) {
    const removeOption = (toRemove: string) => {
        setOptions((prev) => prev.filter((items) => items != toRemove));
    };

    const saveOptions = (options: string[]) => {
        if (!savedOptions.some((saved) => saved === options)) {
            setSavedOptions((prev) => [...prev, options]);
        }
    };

    return (
        <>
            <ol className='mb-1'>
                {options.map((item, index) => (
                    <li key={index}>
                        <span className='text-primary'>{item}</span>
                        <button
                            type='button'
                            className='ms-1 btn btn-sm'
                            onClick={() => removeOption(item)}>
                            <i className='bi bi-x' />
                        </button>
                    </li>
                ))}
            </ol>
            <button
                type='button'
                className='btn btn-sm btn-primary'
                onClick={() => saveOptions(options)}>
                Salvar opções
            </button>
        </>
    );
}
