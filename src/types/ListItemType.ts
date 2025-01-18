export type QuantityType = 'number' | 'options';
export type NumberOf =
    | 'Unidades'
    | 'Gramas'
    | 'Quilos'
    | 'Mililitros'
    | 'Litros';

type ListItemType = {
    id: number;
    name: string;
    qtdType: QuantityType;
    numberOf: NumberOf;
    quantity: number;
    options: string[];
    alertQuantity: number;
    description?: string;
};

export default ListItemType;
