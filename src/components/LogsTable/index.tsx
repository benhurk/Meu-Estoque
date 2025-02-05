import { useMemo, useState } from 'react';
import html2pdf from 'html2pdf.js';

import styles from './LogsTable.module.css';

import Select from '../Select';
import FormGroup from '../FormGroup';

import Months from '../../types/Months';

import mapOptions from '../../utils/mapOptions';
import months from '../../const/months';
import filterLogs from '../../utils/filterLogs';
import useLogsStore from '../../stores/logsStore';
import PlaceholderContent from '../PlaceholderContent';
import InputWithButton from '../InputWithButton';

export default function LogsTable() {
    const { logs, removeLog } = useLogsStore();
    const [monthFilter, setMonthFilter] = useState<Months>();
    const [searchFor, setSearchFor] = useState<string>('');

    const filteredLogs = useMemo(() => {
        return filterLogs(logs, searchFor, monthFilter);
    }, [logs, monthFilter, searchFor]);

    const getDiffColor = (diff: string) => {
        if (diff.includes('+')) return 'text-green';
        else if (diff.includes('-')) return 'text-red';
        else return 'text-dark';
    };

    const date = new Date().toLocaleDateString();

    const downloadPdf = () => {
        const removeItemButtons = document.querySelectorAll('.btn-remove-item');

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
                <FormGroup elementId='logs-filter' labelText='Mês:'>
                    <Select
                        elementId='logs-filter'
                        options={mapOptions(months)}
                        change={(e) =>
                            setMonthFilter(
                                e.currentTarget.dataset.value as Months
                            )
                        }
                        value={monthFilter || 'Todos'}
                        emptyOption='Todos'
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
            <div id='logs-table'>
                <div className={styles.tableInfo}>
                    <div className={styles.info}>
                        <i className='bi bi-circle-fill text-dark' />
                        &nbsp;
                        <span>Quantidade inicial</span>
                    </div>
                    <div className={styles.info}>
                        <i className='bi bi-circle-fill text-green' />
                        &nbsp;
                        <span>Aumentou</span>
                    </div>
                    <div className={styles.info}>
                        <i className='bi bi-circle-fill text-red' />
                        &nbsp;
                        <span>Diminuiu</span>
                    </div>
                </div>
                <div style={{ minHeight: '20rem' }}>
                    {filteredLogs.length > 0 ? (
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
                                    <tr key={log.date + log.item + index}>
                                        <td>
                                            <span>
                                                {log.date.split(' - ')[0]}
                                            </span>
                                            &nbsp;-&nbsp;
                                            <span className={styles.dateTime}>
                                                {log.date.split(' - ')[1]}
                                            </span>
                                        </td>
                                        <td>{log.item}</td>
                                        <td className={getDiffColor(log.diff)}>
                                            {log.diff}
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
                    ) : (
                        <PlaceholderContent text='Nenhum registro disponível.' />
                    )}
                </div>
            </div>
        </>
    );
}
