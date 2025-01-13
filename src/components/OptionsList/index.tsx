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
            <ol className='list-group'>
                {options.map((item, index) => (
                    <li
                        key={index}
                        className='list-group-item p-1 d-flex align-items-center justify-content-between'>
                        <div>
                            <span>{`${index + 1}. `}</span>
                            <span className='text-primary'>{item}</span>
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
        </>
    );
}
