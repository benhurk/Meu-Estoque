import { ItemFormState } from '../types/ItemFormTypes';

const itemFormInitialState: ItemFormState = {
    name: '',
    qtdType: 'number',
    numberOf: 'Unidades',
    quantity: 0,
    options: [],
    alertQuantity: 0,
    description: '',
};

export default itemFormInitialState;
