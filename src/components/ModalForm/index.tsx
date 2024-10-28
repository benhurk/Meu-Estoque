import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../store/reducers/list";
import { ListItemType } from "../../models";
import { RootState } from "../../store";

import QuantityInput from "../QuantityInput";

export default function ModalForm() {
    const [itemName, setItemName] = useState<string>('');
    const [selectedType, setSelectedType] = useState<ListItemType["qtdType"]>('unity');
    const [itemQtd, setItemQtd] = useState<number>(0);
    const [alertQtd, setAlertQtd] = useState<number>(0);

    const dispatch = useDispatch();

    const listItems = useSelector((state: RootState) => state.list.items);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
    }

    const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value as ListItemType["qtdType"]);
    }

    const resetForm = () => {
        setItemName('');
        setItemQtd(0);
        setAlertQtd(0);
    }

    const createNewItem = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newItem: ListItemType = {
            id: listItems.length,
            name: itemName,
            qtdType: selectedType,
            quantity: itemQtd,
            alertQuantity: alertQtd
        }

        dispatch(addItem(newItem));
        resetForm();
    }

    return (
        <div className="modal fade" id="modal-form" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <form className="modal-body">
                        <button type="button" className="btn-close position-absolute top-0 end-0 mt-1 me-1" data-dismiss="modal" />
                        <div className="form-group mb-3">
                            <label htmlFor="item-name" className="mb-1 text-sm">O que é:</label>
                            <input type="text" id="item-name" className="form-control form-control" value={itemName} onChange={handleNameChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="item-qtdtype" className="mb-1">Contar por:</label>
                            <select value={selectedType} onChange={handleSelectType} id="item-qtdtype" className="form-select">
                                <option value='unity'>Unidades</option>
                                <option value='abstract'>{'Quantidade ( Pouco / Suficiente / Bastante )'}</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="item-qtd" className="mb-1 d-block">Quantidade:</label>
                            <QuantityInput size="md" type={selectedType} value={itemQtd} change={(e) => setItemQtd(Number(e.target.value))} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="item-qtd-alert" className="mb-1 d-block">Alertar quando tiver:</label>
                            <QuantityInput size="md" type={selectedType} value={alertQtd} change={(e) => setAlertQtd(Number(e.target.value))} />
                        </div>
                        <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => createNewItem(e)}>
                            <i className="bi bi-plus-lg" /> Adicionar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}