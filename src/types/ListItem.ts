export type Quantity = 'number' | 'options';

type ListItemType = {
    id: number;
    name: string;
    qtdType: Quantity;
    quantity: number;
    alertQuantity: number;
    description?: string;
};

export default ListItemType;
