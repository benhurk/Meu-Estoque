import { UnitsOfMeasurement } from '../types/ListItemTypes';

export default function abbreviateUnitOfMeasurement(value: UnitsOfMeasurement) {
    switch (value) {
        case 'Unidades':
            return 'Un.';
        case 'Gramas':
            return 'g';
        case 'Quilos':
            return 'Kg';
        case 'Mililitros':
            return 'Ml';
        case 'Litros':
            return 'L';
    }
}
