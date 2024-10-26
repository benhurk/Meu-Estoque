import { useSelector } from "react-redux";
import { RootState } from "../../store";

import ListItem from "../ListItem";

export default function List() {
    const listItems = useSelector((state: RootState) => state.list.items);

    return (
        <ul className="list-group">
            {
                listItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                        <ListItem id={index} name={item.name} qtdType={item.qtdType} />
                    </li>
                ))
            }
        </ul>
    )
}