import { useDispatch } from "react-redux";

import { clearList } from "../../store/reducers/list";

import Modal from "../Modal";

type Props = {
    disabled: boolean;
}

export default function RemoveAll({disabled}: Props) {
    const dispatch = useDispatch();

    return (
        <>
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modal-remove" disabled={disabled}>
                <i className="bi bi-trash-fill" /> Apagar tudo
            </button>

            <Modal elementId="modal-remove">
                <div className="text-center">
                    <span className="d-block fs-5 text-danger fw-bold border-bottom mb-4 pb-2">Deseja mesmo apagar tudo?</span>
                    <button type="button" className="btn btn-danger me-2" onClick={() => dispatch(clearList())} data-dismiss="modal">Apagar tudo</button>
                    <button type="button" className="btn btn-dark me-2" data-dismiss="modal">Cancelar</button>
                </div>
            </Modal>
        </>
    )
}