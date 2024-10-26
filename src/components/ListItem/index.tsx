import { useDispatch } from 'react-redux';

import './styles.css';
import { ListItemType } from '../../models';

import { removeItem } from '../../store/reducers/list';

export default function ListItem({id, name, qtdType}: ListItemType) {
    const dispatch = useDispatch();

    const getInput = (type: ListItemType['qtdType']) => {
        if (type === 'unity') {
            return (
                <>
                <input className='item-quantity__input form-control form-control-sm' type='number' />
                <span className='item-quantity__text text-dark'>un.</span>
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
            <span className='item-name text-primary'>{name}</span>
            <div className='item-quantity'>
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