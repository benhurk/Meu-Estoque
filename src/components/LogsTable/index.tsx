import { useState } from 'react';
import useLogs from '../../hooks/useLogs';
import Select from '../Select';
import mapOptions from '../../utils/mapOptions';

import Months from '../../types/Months';
import months from '../../const/months';
import filterLogs from '../../utils/filterLogs';
import FormGroup from '../FormGroup';

export default function LogsTable() {
    const { logs } = useLogs();
    const [logsFilter, setLogsFilter] = useState<Months>();

    const filteredLogs = filterLogs(logs, logsFilter);

    return (
        <>
            <FormGroup elementId='logs-filter' labelText='Filtrar por mês:'>
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
            {filteredLogs.length > 0 ? (
                <table className='table table-striped table-dark'>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Item</th>
                            <th>Alteração</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map((log) => (
                            <tr key={JSON.stringify(log)}>
                                <td>{log.date}</td>
                                <td>{log.item}</td>
                                <td>{log.diff}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div
                    className='d-flex flex-column justify-content-center align-items-center text-center'
                    style={{ height: '20rem' }}>
                    <i className='bi bi-clipboard-x fs-4' />
                    <span className='d-block'>Nenhum registro disponível.</span>
                </div>
            )}
        </>
    );
}
