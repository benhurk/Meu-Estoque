import { useEffect, useMemo, useState } from 'react';
import styles from './List.module.css';

import useFormStore from '../../stores/formStore';

import ListItem from '../ListItem';
import Modal from '../Modal';
import ItemForm from '../ItemForm';
import EmptyListContent from '../EmptyListContent';
import RemoveMultipleButton from '../RemoveMultipleButton';
import InputWithButton from '../InputWithButton';
import useListItems from '../../hooks/useListItems';

export default function List() {
    const listItems = useListItems();
    const [search, setSearch] = useState<string>('');

    const setFormMode = useFormStore((state) => state.setFormMode);

    const searchedItems = useMemo(() => {
        return listItems.filter((item) =>
            item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
    }, [listItems, search]);

    useEffect(() => {
        setSearch('');
    }, [listItems]);

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
                                quantityType: item.quantityType,
                                unitOfMeasurement: item.unitOfMeasurement,
                                quantity: item.quantity,
                                alertQuantity: item.alertQuantity,
                                description: item.description,
                                selected: item.selected,
                            }}
                            setItemFormOpen={setItemFormOpen}
                        />
                    ))}
                </ul>
            ) : (
                <EmptyListContent
                    text={
                        listItems.length === 0
                            ? 'Nenhum item adicionado ainda.'
                            : `Nenhum item encontrado com "${search}".`
                    }
                />
            )}

            <Modal isOpen={itemFormOpen} setIsOpen={setItemFormOpen}>
                <ItemForm setItemFormOpen={setItemFormOpen} />
            </Modal>
        </div>
    );
}
