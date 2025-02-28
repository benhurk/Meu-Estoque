import useUserData from '../../hooks/useUserData';
import ListItemType from '../../types/ListItemTypes';
import Logs from '../../types/Logs';

export default function DownloadButton() {
    const { items: listItems, logs } = useUserData();

    const idLess = (data: ListItemType[] | Logs[]) =>
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data.map(({ id, ...rest }) => rest);
    const date = new Date().toLocaleDateString();
    const data = JSON.stringify({
        list: idLess(listItems),
        logs: idLess(logs),
    });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    return (
        <a
            className='btn btn-dropdown-item text-green'
            href={url}
            role='button'
            download={`Estoque${date}.json`}>
            <i className='bi bi-file-earmark-arrow-down-fill' />
            &nbsp;Baixar
        </a>
    );
}
