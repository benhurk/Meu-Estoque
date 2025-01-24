import { ReactNode } from 'react';

type Props = {
    elementId: string;
    labelText: string;
    error?: string;
    children: ReactNode;
};

export default function FormGroup({
    elementId,
    labelText,
    error,
    children,
}: Props) {
    return (
        <div className='form-group'>
            <label htmlFor={elementId} className='mb-1 d-block'>
                {labelText}
            </label>
            {children}
            {error && <small className='text-danger'>{error}</small>}
        </div>
    );
}
