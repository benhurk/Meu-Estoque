export type QuantityType = 'number' | 'options';

type ListItemType = {
    id: number;
    name: string;
    qtdType: QuantityType;
    quantity: number;
    options: string[];
    alertQuantity: number;
    description?: string;
};

export default ListItemType;
