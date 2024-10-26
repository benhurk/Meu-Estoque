import { useDispatch } from 'react-redux';

import { ListItemType } from '../../models';

import { removeItem } from '../../store/reducers/list';

export default function ListItem({id, name, qtdType}: ListItemType) {
    const dispatch = useDispatch();

    const getInput = (type: ListItemType['qtdType']) => {
        if (type === 'unity') {
            return (
                <>
                    <input className='form-control form-control-sm d-inline-block' style={{width: '5rem'}} type='number' min={0} />
                    <span className='text-dark'>un.</span>
                </>
            )
        }

        if (type === 'abstract') {
            return (
                <select className='form-select form-select-sm'>
                    <option value='1'>Pouco</option>
                    <option value='2'>Suficiente</option>
                    <option value='3'>Bastante</option>
                </select>
            )
        }
    }

    return (
        <>
            <span className='text-primary'>{name}</span>
            <div>
                {getInput(qtdType)}
            </div>
            <div>
                <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => dispatch(removeItem(id))}><i className="bi bi-trash-fill"></i></button>
                <button type="button" className="btn btn-sm btn-primary me-1"><i className="bi bi-gear-fill"></i></button>
                <button type="button" className="btn btn-sm btn-success"><i className="bi bi-send-fill"></i></button>
            </div>
        </>
    )
}