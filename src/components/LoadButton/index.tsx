import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import ListItemType from '../../types/ListItemType';
import { pushItem } from '../../store/reducers/list';

export default function LoadButton() {
    const dispatch = useDispatch();
    const listItems = useSelector((state: RootState) => state.list.items);

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = JSON.parse(reader.result as string);

            result.forEach((loadedItem: ListItemType) => {
                const item: ListItemType = {
                    id: listItems.length + loadedItem.id,
                    name: loadedItem.name,
                    qtdType: loadedItem.qtdType,
                    numberOf: loadedItem.numberOf,
                    options: loadedItem.options,
                    quantity: loadedItem.quantity,
                    alertQuantity: loadedItem.alertQuantity,
                    description: loadedItem.description,
                };

                const isValid = !Object.values(item).some(
                    (val) => typeof val === 'undefined'
                );

                if (isValid) dispatch(pushItem(item));
            });
        };

        if (e.target.files) {
            reader.readAsText(e.target.files[0]);
        }
    };

    return (
        <label className='btn btn-sm btn-light'>
            <i className='bi bi-upload' />
            &nbsp;Importar
            <input
                className='d-none'
                type='file'
                accept='.json, application/JSON'
                onChange={(e) => upload(e)}
            />
        </label>
    );
}
