import { useDispatch } from "react-redux";

import { clearList } from "../../store/reducers/list";

import Modal from "../Modal";

export default function RemoveAll() {
    const dispatch = useDispatch();

    return (
        <>
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modal-remove">
                <i className="bi bi-trash-fill" /> Apagar tudo
            </button>
            <Modal elementId="modal-remove">
                <span className="d-block text-danger fw-bold border-bottom mb-4 pb-2">Deseja mesmo apagar tudo?</span>
                <button type="button" className="btn btn-danger me-2" onClick={() => dispatch(clearList())} data-dismiss="modal">Apagar tudo</button>
                <button type="button" className="btn btn-primary me-2" data-dismiss="modal">Cancelar</button>
            </Modal>
        </>
    )
}