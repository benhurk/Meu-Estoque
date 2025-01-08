import { ReactNode } from 'react';

type Props = {
    elementId: string;
    labelText: string;
    children: ReactNode;
};

export default function FormGroup({ elementId, labelText, children }: Props) {
    return (
        <div className='form-group mb-3'>
            <label htmlFor={elementId} className='mb-1 d-block'>
                {labelText}
            </label>
            {children}
        </div>
    );
}
