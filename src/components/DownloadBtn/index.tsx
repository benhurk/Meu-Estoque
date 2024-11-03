import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { ListItemType } from "../../models";

export default function DownloadBtn() {
    const listItems = useSelector((state: RootState) => state.list.items);

    //-- Reset the items ids --//

    //Create a new list without the ids
    const idLessItems = listItems.map(item => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = item;
        const idLess = { ...rest };

        return idLess;
    })

    //Create a new list with new ids
    const newList: ListItemType[] = idLessItems.map((item, index) => {
        const newItem: ListItemType = {
            id: index,
            name: item.name,
            qtdType: item.qtdType,
            quantity: item.quantity,
            alertQuantity: item.alertQuantity
        }

        return newItem;
    })

    const data = JSON.stringify(newList);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    return (
        <a className="btn btn-success" href={url} download='lista.json'>Baixar</a>
    )
}