import { useEffect, useState } from 'react';

const getSavedOptions = () =>
    JSON.parse(
        localStorage.getItem('saved-options') ||
            JSON.stringify([['Acabou', 'Pouco', 'Suficiente', 'Bastante']])
    );

export default function useSavedOptions() {
    const [savedOptions, setSavedOptions] = useState<string[][]>(
        getSavedOptions()
    );

    useEffect(() => {
        localStorage.setItem('saved-options', JSON.stringify(savedOptions));
    }, [savedOptions]);

    return { savedOptions, setSavedOptions };
}
