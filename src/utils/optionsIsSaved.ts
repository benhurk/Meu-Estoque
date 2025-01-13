export default function optionsIsSaved(
    options: string[],
    savedOptions: string[][]
) {
    if (
        savedOptions.some((saved) =>
            saved.every((item, index) => item === options[index])
        )
    )
        return true;
    else return false;
}
