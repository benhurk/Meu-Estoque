import { FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux";

import { ListItemType } from "../../models";
import { RootState } from "../../store";

import { addItem, editItem } from "../../store/reducers/list";
import { resetModal, setAlertField, setNameField, setQtdField, setTypeField } from "../../store/reducers/modal";

import QuantityInput from "../QuantityInput";

export default function ModalForm() {
    const { modalMode, targetId } = useSelector((state: RootState) => state.modal);
    const { nameField, typeField, qtdField, alertField } = useSelector((state: RootState) => state.modal.formFields);

    const dispatch = useDispatch();

    const listItems = useSelector((state: RootState) => state.list.items);

    const createNewItem = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newItem: ListItemType = {
            id: listItems.length,
            name: nameField,
            qtdType: typeField,
            quantity: qtdField,
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
            quantity: qtdField,
            alertQuantity: alertField
        }

        dispatch(editItem(editedItem));
        dispatch(resetModal());
    }

    return (
        <div className="modal fade" id="modal-form" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <form className="modal-body">
                        <button type="button" className="btn-close position-absolute top-0 end-0 mt-1 me-1" data-dismiss="modal" />
                        <div className="form-group mb-3">
                            <label htmlFor="item-name" className="mb-1 text-sm">O que é:</label>
                            <input type="text" id="item-name" className="form-control form-control" value={nameField} onChange={(e) => dispatch(setNameField(e.target.value))} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="item-qtdtype" className="mb-1">Contar por:</label>
                            <select value={typeField} onChange={(e) => dispatch(setTypeField(e.target.value as ListItemType["qtdType"]))} id="item-qtdtype" className="form-select">
                                <option value='unity'>Unidades</option>
                                <option value='abstract'>{'Quantidade ( Pouco / Suficiente / Bastante )'}</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="item-qtd" className="mb-1 d-block">Quantidade:</label>
                            <QuantityInput size="md" type={typeField} value={qtdField} change={(e) => dispatch(setQtdField(Number(e.target.value)))} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="item-qtd-alert" className="mb-1 d-block">Alertar quando tiver:</label>
                            <QuantityInput size="md" type={typeField} value={alertField} change={(e) => dispatch(setAlertField(Number(e.target.value)))} />
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
                </div>
            </div>
        </div>
    )
}