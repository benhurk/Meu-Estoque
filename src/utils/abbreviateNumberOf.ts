import { NumberOf } from '../types/ListItemType';

export default function abbreviateNumberOf(value: NumberOf) {
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
