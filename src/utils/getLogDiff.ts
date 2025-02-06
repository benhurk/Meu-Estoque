import { NumberOf } from '../types/ListItemTypes';
import abbreviateNumberOf from './abbreviateNumberOf';

export function getOptionsDiff(
    previousQuantity: number,
    newQuantity: number,
    options: string[]
): string {
    if (newQuantity > previousQuantity) {
        return `+ ${options[newQuantity]}`;
    } else if (newQuantity < previousQuantity)
        return `- ${options[newQuantity]}`;
    else return '';
}

export function getNumberDiff(
    previousQuantity: number,
    newQuantity: number,
    unityOfMeasurement: NumberOf
) {
    const diff = newQuantity - previousQuantity;

    return `${diff > 0 ? `+${diff}` : diff} ${abbreviateNumberOf(
        unityOfMeasurement
    )}`;
}
