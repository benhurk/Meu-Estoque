import { useDispatch, useSelector } from "react-redux";
import { resetModal, setModalMode } from "./store/reducers/modal";

import { RootState } from "./store";

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
            <button type="button" className="btn btn-danger">
              <i className="bi bi-x-octagon-fill" /> Apagar tudo
            </button>
          }
        </div>

        { listItems.length > 0 && <List /> }
      </main>
      <ModalForm />
    </>
  )
}

export default App
