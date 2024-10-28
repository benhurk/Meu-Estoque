import { useSelector } from "react-redux";
import { RootState } from "../../store";

import ListItem from "../ListItem";

export default function List() {
    const listItems = useSelector((state: RootState) => state.list.items);

    return (
        <ul className="list-group">
            {
                listItems.map((item) => (
                    <ListItem key={item.id} id={item.id} name={item.name} qtdType={item.qtdType} quantity={item.quantity} alertQuantity={item.alertQuantity} />
                ))
            }
        </ul>
    )
}