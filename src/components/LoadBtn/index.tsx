import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import ListItemType from "../../types/ListItem";
import { pushList } from "../../store/reducers/list";

export default function LoadBtn() {
    const dispatch = useDispatch();
    const listItems = useSelector((state: RootState) => state.list.items);

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result: ListItemType[] = JSON.parse(reader.result as string);

            const loadedItems: ListItemType[] = result.map(loadedItem => {
                const item: ListItemType = {
                    id: listItems.length + loadedItem.id,
                    name: loadedItem.name,
                    qtdType: loadedItem.qtdType,
                    quantity: loadedItem.quantity,
                    alertQuantity: loadedItem.alertQuantity
                }

                return item;
            });

            dispatch(pushList(loadedItems));
        }

        if (e.target.files) {
            reader.readAsText(e.target.files[0]);
        }
    }

    return (
        <label className="btn btn-sm btn-secondary">
            <i className="bi bi-upload" /> Carregar
            <input className="d-none" type="file" accept=".json, application/JSON" onChange={(e) => upload(e)} />
        </label>
    )
}