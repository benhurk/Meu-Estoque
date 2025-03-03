import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';

import styles from './LogsTable.module.css';
import api from '../../api';

import useLocalLogsStore from '../../stores/localLogsStore';
import useUserData from '../../hooks/useUserData';
import useAuth from '../../hooks/useAuth';
import useUserDataStore from '../../stores/userDataStore';

import FormGroup from '../FormGroup';
import EmptyListContent from '../EmptyListContent';
import InputWithButton from '../InputWithButton';
import Select from '../Select';

import Months from '../../types/Months';
import Logs from '../../types/Logs';

import filterLogs from '../../utils/filterLogs';
import months from '../../consts/months';
import keysToCamelCase from '../../utils/snakeToCamel';
import Loader from '../Loader';
import handleApiErrors from '../../utils/handleApiErrors';

export default function LogsTable() {
    const { accessToken, guest } = useAuth();
    const { logs } = useUserData();
    const { setUserLogs, removeUserLog } = useUserDataStore();
    const removeLocalLog = useLocalLogsStore((state) => state.removeLocalLog);
    const navigate = useNavigate();

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
                const res = await api.get('/logs', {
                    params: { month: monthFilter },
                });
                setUserLogs(keysToCamelCase(res.data.userLogs));
            } catch (error) {
                handleApiErrors(error, setFetchError);

                if (axios.isAxiosError(error)) {
                    if (error.response && error.response.status != 403) {
                        navigate('/signin');
                    }
                }
            }

            setLoading(false);
        };

        if (!guest) fetchUserLogs();
    }, [accessToken, guest, monthFilter, navigate, setUserLogs]);

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
            <div className={styles.filterArea}>
                <FormGroup elementId='logs-filter' labelText='Mês:'>
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
                </FormGroup>
                <FormGroup elementId='search-for' labelText='Pesquisar item:'>
                    <InputWithButton
                        inputId='search-for'
                        placeholderText='Nome do item'
                        buttonIconClass='bi-search'
                        onButtonClick={(inputValue) => setSearchFor(inputValue)}
                        clearAfter={false}
                        clearBtn={() => setSearchFor('')}
                    />
                </FormGroup>
            </div>
            <button
                type='button'
                className={`btn btn-green ${styles.pdfButton}`}
                disabled={filteredLogs.length > 0 ? false : true}
                onClick={() => downloadPdf()}>
                <i className='bi bi-file-earmark-arrow-down-fill' />
                &nbsp;Baixar .pdf
            </button>
            <div id='logs-table'>
                {loading ? (
                    <Loader />
                ) : filteredLogs.length > 0 && !fetchError ? (
                    <>
                        <div className={styles.tableInfo}>
                            <div>
                                <i className='bi bi-circle-fill text-green' />
                                &nbsp;
                                <span>Aumentou</span>
                            </div>
                            <div>
                                <i className='bi bi-circle-fill text-red' />
                                &nbsp;
                                <span>Diminuiu</span>
                            </div>
                        </div>
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
                                : `Nenhum registro disponível em ${monthFilter}.`
                        }
                    />
                )}
            </div>
        </>
    );
}
