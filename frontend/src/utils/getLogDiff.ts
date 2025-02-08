import { NumberOf } from '../types/ListItemTypes';
import abbreviateNumberOf from './abbreviateNumberOf';

export default function getNumberDiff(
    previousQuantity: number,
    newQuantity: number,
    unityOfMeasurement: NumberOf
) {
    const diff = newQuantity - previousQuantity;

    return `${diff > 0 ? `+${diff}` : diff} ${abbreviateNumberOf(
        unityOfMeasurement
    )}`;
}
