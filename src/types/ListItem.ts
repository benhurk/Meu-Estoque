export type Quantity = 'number' | 'options';

type ListItemType = {
    id: number;
    name: string;
    qtdType: Quantity;
    quantity: number;
    options: string[];
    alertQuantity: number;
    description?: string;
};

export default ListItemType;
