import { ListItemType } from "../models";

export default function abstractSwitch(item: ListItemType) {
    switch (item.quantity) {
        case 0: return 'Acabando'
        case 1: return 'Pouco'
        case 2: return 'Suficiente'
        case 3: return 'Bastante'
    }
}