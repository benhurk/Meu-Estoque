import { defaultQuantityOptions } from '../consts/quantityOptions';
import { QuantityType, UnitsOfMeasurement } from '../types/ListItemTypes';
import abbreviateUnitOfMeasurement from './abbreviateUnitOfMeasurement';

export default function getLogChange(
    quantityType: QuantityType,
    previousQuantity: number,
    newQuantity: number,
    unitOfMeasurement: UnitsOfMeasurement
): { valueChange: string; type: 'increase' | 'decrease' } {
    const diff = newQuantity - previousQuantity;

    if (quantityType === 'options') {
        return {
            valueChange: defaultQuantityOptions[newQuantity].label,
            type: diff > 0 ? 'increase' : 'decrease',
        };
    }

    return {
        valueChange: `${
            diff > 0 ? `+${diff}` : diff
        } ${abbreviateUnitOfMeasurement(unitOfMeasurement)}`,
        type: diff > 0 ? 'increase' : 'decrease',
    };
}
