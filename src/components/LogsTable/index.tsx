import { useState } from 'react';

import styles from './LogsTable.module.css';

import Select from '../Select';
import FormGroup from '../FormGroup';

import Months from '../../types/Months';

import mapOptions from '../../utils/mapOptions';
import months from '../../const/months';
import filterLogs from '../../utils/filterLogs';
import useLogsStore from '../../stores/logsStore';
import PlaceholderContent from '../PlaceholderContent';

export default function LogsTable() {
    const logs = useLogsStore((state) => state.logs);
    const [logsFilter, setLogsFilter] = useState<Months>();

    const filteredLogs = filterLogs(logs, logsFilter);

    const getDiffColor = (diff: string) => {
        if (Number(diff) > 0 || diff === 'Adicionado') return 'text-green';
        else return 'text-red';
    };

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
                                        <span>{log.date.split(' - ')[0]}</span>
                                        &nbsp;-&nbsp;
                                        <span className={styles.dateTime}>
                                            {log.date.split(' - ')[1]}
                                        </span>
                                    </td>
                                    <td>{log.item}</td>
                                    <td className={getDiffColor(log.diff)}>
                                        {log.diff}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <PlaceholderContent text='Nenhum registro disponível.' />
                )}
            </div>
        </>
    );
}
