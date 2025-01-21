import { useSelector } from 'react-redux';

import { RootState } from '../../store';

export default function DownloadButton() {
    const listItems = useSelector((state: RootState) => state.list.items);

    const date = new Date().toLocaleDateString();
    const data = JSON.stringify(listItems);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    return (
        <a
            className='btn btn-sm btn-success'
            href={url}
            role='button'
            download={`Estoque${date}.json`}>
            <i className='bi bi-download' />
            &nbsp;Baixar
        </a>
    );
}
