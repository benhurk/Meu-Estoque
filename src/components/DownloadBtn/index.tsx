import { useSelector } from "react-redux";

import { RootState } from "../../store";

export default function DownloadBtn() {
    const listItems = useSelector((state: RootState) => state.list.items);

    const data = JSON.stringify(listItems);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    return (
        <a className="btn btn-sm btn-success" href={url} download='lista.json'>
            <i className="bi bi-download" /> Baixar
        </a>
    )
}