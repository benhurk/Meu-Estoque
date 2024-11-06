import { useDispatch } from 'react-redux';

import { ListItemType } from '../../models';
import { removeItem, editItem } from '../../store/reducers/list';
import { setAlertField, setModalMode, setNameField, setQtdField, setTargetId, setTypeField } from '../../store/reducers/modal';

import QuantityInput from '../QuantityInput';

export default function ListItem({id, name, qtdType, quantity, alertQuantity}: ListItemType) {
    const dispatch = useDispatch();

    const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.value[0] === '0') {
            e.target.value = String(Number(e.target.value) * 1);
        }

        const itemObj: ListItemType = {
            id,
            name,
            qtdType,
            quantity: Number(e.target.value),
            alertQuantity
        }

        dispatch(editItem(itemObj));
    }

    const setEditModal = (id: number) => {
        dispatch(setTargetId(id));
        dispatch(setModalMode('edit'));
        dispatch(setNameField(name));
        dispatch(setTypeField(qtdType));
        dispatch(setQtdField(quantity));
        dispatch(setAlertField(alertQuantity));
    }

    const warn = quantity <= alertQuantity;

    return (
        <li className='list-group-item d-flex align-items-center justify-content-between'>
            <div className='w-75'>
                <div className='mb-2'>
                    <span className={`d-inline ${warn ? 'text-danger' : 'text-primary'}`}>{name}</span>
                    {warn && <i className="bi bi-exclamation-diamond-fill text-danger ms-1"></i>}
                </div>
                <div>
                    <QuantityInput value={quantity} type={qtdType} change={changeValue} />
                </div>
            </div>
            <div>
                <button type="button" className="btn btn-sm btn-primary me-1" data-toggle="modal" data-target="#modal-form" onClick={() => setEditModal(id)}>
                    <i className="bi bi-pencil-fill"></i>
                </button>
                <button type="button" className="btn btn-sm btn-danger" onClick={() => dispatch(removeItem(id))}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
        </li>
    )
}