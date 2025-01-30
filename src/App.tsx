import { useState } from 'react';
import './styles.css';

import useListStore from './stores/listStore';
import useFormStore from './stores/formStore';

import Header from './components/Header';
import ListItem from './components/ListItem';
import Modal from './components/Modal';
import ItemForm from './components/ItemForm';
import ListButtons from './components/ListButtons';
import PlaceholderContent from './components/PlaceholderContent';

function App() {
    const listItems = useListStore((state) => state.items);
    const setFormMode = useFormStore((state) => state.setFormMode);

    const [itemFormOpen, setItemFormOpen] = useState<boolean>(false);

    return (
        <>
            <Header />
            <main className='container'>
                <ListButtons
                    setFormMode={setFormMode}
                    openFormFn={setItemFormOpen}
                />
                {listItems.length > 0 ? (
                    <ul>
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
                ) : (
                    <PlaceholderContent text='Nenhum item adicionado ainda.' />
                )}

                <Modal isOpen={itemFormOpen} setIsOpen={setItemFormOpen}>
                    <ItemForm setItemFormOpen={setItemFormOpen} />
                </Modal>
            </main>
        </>
    );
}

export default App;
