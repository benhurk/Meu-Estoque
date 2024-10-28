import { useDispatch, useSelector } from "react-redux";
import { resetModal, setModalMode } from "./store/reducers/modal";

import { RootState } from "./store";

import List from "./components/List";
import ModalForm from "./components/ModalForm";

function App() {
  const dispatch = useDispatch();
  const listItems = useSelector((state: RootState) => state.list.items);
  const warnedItems = listItems.filter(item => item.quantity <= item.alertQuantity);
  
  const sendAll = () => {
    const num = '47996825217';
    let message = '';

    listItems.forEach(item => {
      let abstractQuantity;

      if (item.qtdType === 'abstract') {
        switch (item.quantity) {
          case 0:
            abstractQuantity = 'Acabando'
          break;
          case 1:
            abstractQuantity = 'Pouco'
          break;
          case 2:
            abstractQuantity = 'Suficiente'
          break;
          case 3:
            abstractQuantity = 'Bastante'
          break;
        }
      }

      const itemMessage = `*• ${item.quantity <= item.alertQuantity ? '❗' : '✅'} ${item.name}:* ${item.qtdType === 'unity' ? item.quantity : abstractQuantity} ${item.qtdType === 'unity' ? 'unidades' : ''}%0a`;

      message += itemMessage;
    })

    const url = `https://api.whatsapp.com/send/?phone=${num}&text=${message}`;
    window.open(url);
  }

  const sendImportant = () => {
    const num = '47996825217';
    let message = '❗ *Precisa de: ❗*%0a%0a';

    warnedItems.forEach(item => {
      let abstractQuantity;

      if (item.qtdType === 'abstract') {
        switch (item.quantity) {
          case 0:
            abstractQuantity = 'Acabando'
          break;
          case 1:
            abstractQuantity = 'Pouco'
          break;
          case 2:
            abstractQuantity = 'Suficiente'
          break;
          case 3:
            abstractQuantity = 'Bastante'
          break;
        }
      }

      const itemMessage = `*• ${item.name}* (${item.qtdType === 'unity' ? item.quantity + ' unidades' : abstractQuantity})%0a`;

      message += itemMessage;
    })

    const url = `https://api.whatsapp.com/send/?phone=${num}&text=${message}`;
    window.open(url);
  }

  const setModal = () => {
    dispatch(setModalMode('add'));
    dispatch(resetModal());
  }

  return (
    <>
      <header className="container py-4 bg-primary">
        <h1 className="text-center text-light">Eztoque</h1>
      </header>
      <main className="container py-4">
        <button type="button" className="btn btn-success mx-auto d-block mb-4" data-toggle="modal" data-target="#modal-form" onClick={setModal}>
          <i className="bi bi-plus-lg" /> Adicionar item
        </button>
        <List />
        <div className="mb-4 d-flex justify-content-center gap-2 mt-4">
          <button type="button" className="btn btn-sm btn-primary" disabled={listItems.length > 0 ? false : true} onClick={() => sendAll()}>
            <i className="bi bi-send-fill"></i> Enviar tudo
          </button>
          <button type="button" className="btn btn-sm btn-danger" disabled={warnedItems.length > 0 ? false : true} onClick={() => sendImportant()}>
            <i className="bi bi-send-exclamation-fill"></i> Enviar importantes
          </button>
        </div>
      </main>
      <ModalForm />
    </>
  )
}

export default App
