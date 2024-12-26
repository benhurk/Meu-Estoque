export type Quantity = 'unity' | 'abstract';

type ListItemType = {
    id: number;
    name: string;
    qtdType: Quantity;
    quantity: number;
    alertQuantity: number;
}

export default ListItemType;