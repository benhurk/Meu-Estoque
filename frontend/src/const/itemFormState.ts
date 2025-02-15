import { ItemFormState } from '../types/ItemFormTypes';

const itemFormInitialState: ItemFormState = {
    name: '',
    quantityType: 'number',
    unitOfMeasurement: 'Unidades',
    quantity: 0,
    alertQuantity: 0,
    description: '',
};

export default itemFormInitialState;
