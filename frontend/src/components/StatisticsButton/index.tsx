import { useNavigate } from 'react-router-dom';

export default function StatisticsButton() {
    const navigate = useNavigate();

    return (
        <>
            <button
                type='button'
                className='btn btn-yellow'
                onClick={() => navigate('/logs')}>
                <i className='bi bi-bar-chart-fill' />
                &nbsp;Registros
            </button>
        </>
    );
}
