import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import ListItemType, { Quantity } from "../../types/ListItem";

import { addItem, editItem } from "../../store/reducers/list";
import { resetModal } from "../../store/reducers/modal";

import QuantityInput from "../QuantityInput";

export default function ItemForm() {
    const listItems = useSelector((state: RootState) => state.list.items);

    const { modalMode, targetId } = useSelector((state: RootState) => state.modal);

    const [ nameField, setNameField ] = useState<string>('');
    const [ typeField, setTypeField ] = useState<Quantity>('unity');
    const [ quantityField, setQuantityField ] = useState<number>(0);
    const [ alertField, setAlertField ] = useState<number>(0);

    const dispatch = useDispatch();

    const createNewItem = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newItem: ListItemType = {
            id: listItems.length,
            name: nameField,
            qtdType: typeField,
            quantity: quantityField,
            alertQuantity: alertField
        }

        dispatch(addItem(newItem));
        dispatch(resetModal());
    }

    const saveItem = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const editedItem: ListItemType = {
            id: targetId,
            name: nameField,
            qtdType: typeField,
            quantity: quantityField,
            alertQuantity: alertField
        }

        dispatch(editItem(editedItem));
        dispatch(resetModal());
    }

    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="item-name" className="mb-1 text-sm">O que é:</label>
                <input type="text" id="item-name" className="form-control" value={nameField} onChange={(e) => setNameField(e.target.value)} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="item-qtdtype" className="mb-1">Contar por:</label>
                <select value={typeField} onChange={(e) => setTypeField(e.target.value as Quantity)} id="item-qtdtype" className="form-select">
                    <option value='unity'>Unidades</option>
                    <option value='abstract'>{'Quantidade ( Pouco / Suficiente / Bastante )'}</option>
                </select>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="item-qtd" className="mb-1 d-block">Quantidade:</label>
                <QuantityInput size="md" type={typeField} value={quantityField} change={(e) => setQuantityField(Number(e.target.value))} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="item-qtd-alert" className="mb-1 d-block">Alertar quando tiver:</label>
                <QuantityInput size="md" type={typeField} value={alertField} change={(e) => setAlertField(Number(e.target.value))} />
            </div>
            {
                modalMode === 'add' &&
                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => createNewItem(e)}>
                    <i className="bi bi-plus-lg" /> Adicionar
                </button> 
            }
            {
                modalMode === 'edit' &&
                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveItem(e)}>
                    <i className="bi bi-check-lg" /> Salvar
                </button> 
            }
        </form>
    )
}