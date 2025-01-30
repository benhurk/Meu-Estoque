import { useState } from 'react';

import styles from './LogsTable.module.css';

import Select from '../Select';
import FormGroup from '../FormGroup';

import Months from '../../types/Months';

import mapOptions from '../../utils/mapOptions';
import months from '../../const/months';
import filterLogs from '../../utils/filterLogs';
import useLogsStore from '../../stores/logsStore';

export default function LogsTable() {
    const logs = useLogsStore((state) => state.logs);
    const [logsFilter, setLogsFilter] = useState<Months>();

    const filteredLogs = filterLogs(logs, logsFilter);

    return (
        <>
            <FormGroup elementId='logs-filter' labelText='Mês:'>
                <Select
                    elementId='logs-filter'
                    options={mapOptions(months)}
                    change={(e) =>
                        setLogsFilter(e.currentTarget.dataset.value as Months)
                    }
                    value={logsFilter || 'Todos'}
                    emptyOption='Todos'
                />
            </FormGroup>
            <div style={{ height: '20rem' }}>
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
                                        <span>{log.date.split(' - ')[0]}</span>
                                        &nbsp;-&nbsp;
                                        <span className={styles.dateTime}>
                                            {log.date.split(' - ')[1]}
                                        </span>
                                    </td>
                                    <td>{log.item}</td>
                                    <td>{log.diff}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='d-flex flex-column justify-content-center align-items-center h-100 text-center'>
                        <i className='bi bi-clipboard-x fs-4' />
                        <span className='d-block'>
                            Nenhum registro disponível.
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
