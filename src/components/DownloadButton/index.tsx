import useListStore from '../../stores/listStore';

export default function DownloadButton() {
    const listItems = useListStore((state) => state.items);

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
