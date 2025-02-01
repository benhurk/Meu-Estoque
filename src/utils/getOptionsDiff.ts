export default function getOptionsDiff(
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
