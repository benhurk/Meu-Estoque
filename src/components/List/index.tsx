import { useMemo, useState } from 'react';
import styles from './List.module.css';

import useFormStore from '../../stores/formStore';
import useListStore from '../../stores/listStore';

import ListItem from '../ListItem';
import Modal from '../Modal';
import ItemForm from '../ItemForm';
import PlaceholderContent from '../PlaceholderContent';
import RemoveMultipleButton from '../RemoveMultipleButton';
import InputWithButton from '../InputWithButton';

export default function List() {
    const [search, setSearch] = useState<string>('');

    const listItems = useListStore((state) => state.items);
    const setFormMode = useFormStore((state) => state.setFormMode);

    const searchedItems = useMemo(() => {
        return listItems.filter((item) =>
            item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
    }, [listItems, search]);

    const [itemFormOpen, setItemFormOpen] = useState<boolean>(false);

    return (
        <div className={styles.listContainer}>
            <div className={styles.buttonsArea}>
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
                <RemoveMultipleButton />
            </div>
            <div className={styles.searchArea}>
                <InputWithButton
                    buttonIconClass='bi-search'
                    onButtonClick={(inputValue) => setSearch(inputValue)}
                    clearAfter={false}
                    clearBtn={() => setSearch('')}
                    placeholderText='Pesquisar item'
                />
            </div>
            {searchedItems.length > 0 ? (
                <ul>
                    {searchedItems.map((item) => (
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
                <PlaceholderContent
                    text={
                        listItems.length === 0
                            ? 'Nenhum item adicionado ainda.'
                            : 'Nenhum item encontrado.'
                    }
                />
            )}

            <Modal isOpen={itemFormOpen} setIsOpen={setItemFormOpen}>
                <ItemForm setItemFormOpen={setItemFormOpen} />
            </Modal>
        </div>
    );
}
