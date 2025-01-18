import { useDispatch, useSelector } from 'react-redux';

import './styles.css';

import { RootState } from './store';
import { setFormMode } from './store/reducers/form';

import Header from './components/Header';
import RemoveAll from './components/RemoveAll';
import ListItem from './components/ListItem';
import { useState } from 'react';
import Modal from './components/Modal';
import ItemForm from './components/ItemForm';

function App() {
    const dispatch = useDispatch();
    const listItems = useSelector((state: RootState) => state.list.items);

    const [itemFormOpen, setItemFormOpen] = useState<boolean>(false);

    return (
        <>
            <Header />
            <main className='wraper py-5'>
                <div className='mb-4 d-flex justify-content-center gap-3'>
                    <button
                        type='button'
                        className='btn btn-dark'
                        onClick={() => {
                            dispatch(setFormMode('add'));
                            setItemFormOpen(true);
                        }}>
                        <i className='bi bi-plus-lg' />
                        &nbsp;Adicionar item
                    </button>
                    <RemoveAll
                        disabled={listItems.length <= 1 ? true : false}
                    />
                </div>
                <ul className='list-group'>
                    {listItems.map((item) => (
                        <ListItem
                            key={item.id}
                            item={{
                                id: item.id,
                                name: item.name,
                                qtdType: item.qtdType,
                                numberOf: item.numberOf,
                                quantity: item.quantity,
                                options: item.options,
                                alertQuantity: item.alertQuantity,
                                description: item.description,
                            }}
                            setItemFormOpen={setItemFormOpen}
                        />
                    ))}
                </ul>

                <Modal isOpen={itemFormOpen} setIsOpen={setItemFormOpen}>
                    <ItemForm setItemFormOpen={setItemFormOpen} />
                </Modal>
            </main>
        </>
    );
}

export default App;
