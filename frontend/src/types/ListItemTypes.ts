export type QuantityType = 'number' | 'options';
export type UnitsOfMeasurement =
    | 'Unidades'
    | 'Gramas'
    | 'Quilos'
    | 'Mililitros'
    | 'Litros';

type ListItemType = {
    id: number | string;
    name: string;
    quantityType: QuantityType;
    unitOfMeasurement: UnitsOfMeasurement;
    quantity: number;
    alertQuantity: number;
    description: string;
    selected?: boolean;
};

export default ListItemType;
