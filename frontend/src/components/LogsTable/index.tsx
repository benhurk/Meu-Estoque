import { useEffect, useMemo, useState } from 'react';
import html2pdf from 'html2pdf.js';

import styles from './LogsTable.module.css';
import api from '../../api';

import useUserData from '../../hooks/useUserData';
import useAuth from '../../hooks/useAuth';
import useUserDataStore from '../../stores/userDataStore';
import useLocalDataStore from '../../stores/localDataStore';

import EmptyListContent from '../EmptyListContent';
import InputWithButton from '../InputWithButton';
import Select from '../Select';
import Loader from '../Loader';

import Months from '../../types/Months';
import Logs from '../../types/Logs';

import filterLogs from '../../utils/filterLogs';
import months from '../../consts/months';
import keysToCamelCase from '../../utils/snakeToCamel';
import handleApiErrors from '../../utils/handleApiErrors';

export default function LogsTable() {
    const { accessToken, guest } = useAuth();
    const { logs } = useUserData();
    const { setUserLogs, removeUserLog } = useUserDataStore();
    const removeLocalLog = useLocalDataStore((state) => state.removeLocalLog);

    const [monthFilter, setMonthFilter] = useState<Months>(
        months[new Date().getMonth()]
    );
    const [searchFor, setSearchFor] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<string>('');

    useEffect(() => {
        const fetchUserLogs = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/logs/${monthFilter}`);
                setUserLogs(keysToCamelCase(res.data.userLogs));
            } catch (error) {
                handleApiErrors(error, setFetchError);
            }

            setLoading(false);
        };

        if (!guest) fetchUserLogs();
    }, [accessToken, guest, monthFilter, setUserLogs]);

    const filteredLogs = useMemo(() => {
        return filterLogs(logs, searchFor, monthFilter);
    }, [logs, monthFilter, searchFor]);

    const getDiffColor = (diffType: Logs['type']) => {
        switch (diffType) {
            case 'increase':
                return 'text-green';
            case 'decrease':
                return 'text-red';
            default:
                return 'text-dark';
        }
    };

    const downloadPdf = () => {
        const removeItemButtons = document.querySelectorAll('.btn-remove-item');
        const date = new Date().toLocaleDateString();

        removeItemButtons.forEach((btn) =>
            btn.setAttribute('style', 'opacity: 0;')
        );

        const table = document.getElementById('logs-table');
        const opt = {
            margin: [5, 0, 0, 0],
            filename: `RegistrosEstoque${date}.pdf`,
        };

        html2pdf().set(opt).from(table).save();

        setTimeout(() => {
            removeItemButtons.forEach((btn) =>
                btn.setAttribute('style', 'opacity: 1;')
            );
        }, 100);
    };

    const removeLog = (id: string) => {
        if (accessToken) {
            removeUserLog(id);
        } else if (guest) {
            removeLocalLog(id);
        }
    };

    return (
        <>
            <button
                type='button'
                className={`btn btn-green ${styles.pdfButton}`}
                disabled={filteredLogs.length > 0 ? false : true}
                onClick={() => downloadPdf()}>
                <i className='bi bi-file-earmark-arrow-down-fill' />
                &nbsp;Baixar .pdf
            </button>
            <div className={styles.filterArea}>
                <div>
                    <Select
                        elementId='logs-filter'
                        options={months.map((month) => {
                            return { label: month, value: month };
                        })}
                        value={monthFilter}
                        change={(e) =>
                            setMonthFilter(
                                e.currentTarget.dataset.value! as Months
                            )
                        }
                    />
                </div>
                <InputWithButton
                    inputId='search-for'
                    placeholderText='Pesquisar item'
                    buttonIconClass='bi-search'
                    onButtonClick={(inputValue) => setSearchFor(inputValue)}
                    clearAfter={false}
                    clearBtn={() => setSearchFor('')}
                />
            </div>
            <div id='logs-table'>
                {loading ? (
                    <Loader />
                ) : filteredLogs.length > 0 && !fetchError ? (
                    <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Item</th>
                                    <th>Alteração</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log, index) => (
                                    <tr key={log.time + log.itemName + index}>
                                        <td>
                                            <span>
                                                {log.time.split(', ')[0]}
                                            </span>
                                            &nbsp;-&nbsp;
                                            <span className={styles.dateTime}>
                                                {log.time.split(', ')[1]}
                                            </span>
                                        </td>
                                        <td>{log.itemName}</td>
                                        <td className={getDiffColor(log.type)}>
                                            {log.change}
                                        </td>
                                        <td className={styles.removeButton}>
                                            <button
                                                type='button'
                                                className='btn-remove-item bi bi-x'
                                                onClick={() =>
                                                    removeLog(log.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <EmptyListContent
                        text={
                            fetchError
                                ? fetchError
                                : searchFor.length > 0
                                ? `Nenhum registro encontrado com "${searchFor}".`
                                : `Nenhum registro disponível em ${monthFilter}.`
                        }
                    />
                )}
            </div>
        </>
    );
}
