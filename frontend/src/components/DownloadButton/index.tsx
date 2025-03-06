import axios from 'axios';
import useUserData from '../../hooks/useUserData';
import ListItemType from '../../types/ListItemTypes';
import Logs from '../../types/Logs';
import handleApiErrors from '../../utils/handleApiErrors';
import { triggerErrorToast } from '../../utils/triggerToast';
import useAuth from '../../hooks/useAuth';
import useLocalDataStore from '../../stores/localDataStore';

export default function DownloadButton() {
    const { accessToken, guest } = useAuth();
    const listItems = useUserData().items;
    const localLogs = useLocalDataStore((state) => state.localLogs);

    const idLess = (data: ListItemType[] | Logs[]) =>
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data.map(({ id, ...rest }) => rest);

    const downloadData = async () => {
        let url = '';
        if (accessToken) {
            try {
                const res = await axios.get('/logs');
                const logs = res.data.userLogs;

                const data = JSON.stringify({
                    list: idLess(listItems),
                    logs: idLess(logs),
                });
                const blob = new Blob([data], { type: 'application/json' });
                url = URL.createObjectURL(blob);
            } catch (error) {
                handleApiErrors(error, triggerErrorToast);
            }
        } else if (guest) {
            const data = JSON.stringify({
                list: idLess(listItems),
                logs: idLess(localLogs),
            });
            const blob = new Blob([data], { type: 'application/json' });
            url = URL.createObjectURL(blob);
        }

        const a = document.getElementById(
            'download-anchor'
        )! as HTMLAnchorElement;
        a.href = url;
        a.click();
    };

    const date = new Date().toLocaleDateString();

    return (
        <>
            <button
                type='button'
                className='btn btn-dropdown-item text-green'
                onClick={downloadData}>
                <i className='bi bi-file-earmark-arrow-down-fill' />
                &nbsp;Baixar
            </button>
            <a
                id='download-anchor'
                style={{ display: 'none' }}
                download={`estoque-${date}.json`}
            />
        </>
    );
}
