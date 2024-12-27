import ListItemType from "../types/ListItem";

export default function abstractSwitch(item: ListItemType) {
    switch (item.quantity) {
        case 0: return 'Não tem'
        case 1: return 'Pouco'
        case 2: return 'Suficiente'
        case 3: return 'Bastante'
    }
}