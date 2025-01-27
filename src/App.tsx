import { useState } from 'react';
import './styles.css';

import useListStore from './stores/listStore';
import useFormStore from './stores/formStore';

import Header from './components/Header';
import RemoveAll from './components/RemoveAll';
import ListItem from './components/ListItem';
import Modal from './components/Modal';
import ItemForm from './components/ItemForm';

function App() {
    const listItems = useListStore((state) => state.items);
    const setFormMode = useFormStore((state) => state.setFormMode);

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
                            setFormMode('add');
                            setItemFormOpen(true);
                        }}>
                        <i className='bi bi-plus-lg' />
                        &nbsp;Adicionar item
                    </button>
                    <RemoveAll />
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
                                selected: item.selected,
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
