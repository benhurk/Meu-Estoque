import { Dispatch, SetStateAction } from 'react';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
};

export default function OptionsList({ options, setOptions }: Props) {
    const removeOption = (toRemove: string) => {
        setOptions((prev) => prev.filter((items) => items != toRemove));
    };

    return (
        <>
            <ol className='mb-1'>
                {options.map((item, index) => (
                    <li key={index}>
                        <span className='text-primary'>{item}</span>
                        <button
                            type='button'
                            className='btn btn-sm text-danger'
                            onClick={() => removeOption(item)}>
                            <i className='bi bi-x' />
                        </button>
                    </li>
                ))}
            </ol>
        </>
    );
}
