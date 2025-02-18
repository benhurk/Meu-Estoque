import { UnitsOfMeasurement } from '../types/ListItemTypes';
import abbreviateUnitOfMeasurement from './abbreviateUnitOfMeasurement';

export default function getNumberDiff(
    previousQuantity: number,
    newQuantity: number,
    unityOfMeasurement: UnitsOfMeasurement
) {
    const diff = newQuantity - previousQuantity;

    return `${diff > 0 ? `+${diff}` : diff} ${abbreviateUnitOfMeasurement(
        unityOfMeasurement
    )}`;
}
