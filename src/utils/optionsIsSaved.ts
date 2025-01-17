export default function optionsIsNotSaved(
    options: string[],
    savedOptions: string[][]
) {
    return !savedOptions.some(
        (saved) =>
            saved.length === options.length &&
            saved.every((value, index) => value === options[index])
    );
}
