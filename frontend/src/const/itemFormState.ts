import { FormState } from '../types/ItemFormTypes';

const itemFormInitialState: FormState = {
    name: '',
    qtdType: 'number',
    numberOf: 'Unidades',
    quantity: 0,
    options: [],
    alertQuantity: 0,
    description: '',
};

export default itemFormInitialState;
