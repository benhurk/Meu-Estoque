import SelectOptions from '../types/SelectOptions';

export default function mapOptions(
    options: string[] | string[][],
    valueAs?: 'name' | 'number'
): SelectOptions {
    return options.map((option, index) => {
        return {
            label: option,
            value: valueAs === 'number' ? String(index) : option,
        };
    });
}
