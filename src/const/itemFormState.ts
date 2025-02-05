import { FormState } from '../types/FormTypes';

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
