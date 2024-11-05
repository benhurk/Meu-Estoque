import { useDispatch, useSelector } from "react-redux";
import { resetModal, setModalMode } from "./store/reducers/modal";

import { RootState } from "./store";
import { clearList } from "./store/reducers/list";

import Header from "./components/Header";
import List from "./components/List";
import ModalForm from "./components/ModalForm";

function App() {
  const dispatch = useDispatch();
  const listItems = useSelector((state: RootState) => state.list.items);

  const setModal = () => {
    dispatch(setModalMode('add'));
    dispatch(resetModal());
  }

  return (
    <>
      <Header />
      <main className="container py-4">
        <div className="mb-4 d-flex justify-content-center gap-3">
          <button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-form" onClick={setModal}>
            <i className="bi bi-plus-lg" /> Adicionar item
          </button>
          {
            listItems.length > 0 &&
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#removeAll-confirm">
              <i className="bi bi-trash-fill" /> Apagar tudo
            </button>
          }
        </div>

        { listItems.length > 0 && <List /> }
      </main>
      <ModalForm />
      <div id="removeAll-confirm" className="modal fade" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close position-absolute top-0 end-0 mt-1 me-1" data-dismiss="modal" />
              <span className="text-danger fw-bold">Deseja mesmo apagar tudo?</span>
            </div>
            <div className="modal-body">
              <button type="button" className="btn btn-danger me-2" onClick={() => dispatch(clearList())} data-dismiss="modal">Apagar tudo</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
