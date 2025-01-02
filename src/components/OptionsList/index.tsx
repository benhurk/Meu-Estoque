import { Dispatch, SetStateAction } from 'react';

type Props = {
    options: string[];
    setOptions: Dispatch<SetStateAction<string[]>>;
};

export default function OptionsList({ options, setOptions }: Props) {
    const removeItem = (toRemove: string) => {
        setOptions((prev) => prev.filter((items) => items != toRemove));
    };

    return (
        <ol>
            {options.map((item, index) => (
                <li key={index}>
                    <span className='text-primary'>{item}</span>
                    <button
                        type='button'
                        className='ms-1 btn btn-sm'
                        onClick={() => removeItem(item)}>
                        <i className='bi bi-x' />
                    </button>
                </li>
            ))}
        </ol>
    );
}
