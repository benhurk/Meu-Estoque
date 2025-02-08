export default function optionsIsSaved(
    options: string[],
    savedOptions: string[][]
) {
    return savedOptions.some(
        (saved) =>
            saved.length === options.length &&
            saved.every((value, index) => value === options[index])
    );
}
