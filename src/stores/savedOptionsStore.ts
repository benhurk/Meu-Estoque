import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SavedOptionsState = {
    savedOptions: string[][];
    saveOptions: (options: string[]) => void;
    removeSavedOptions: (options: string[]) => void;
};

const useSavedOptionsStore = create<SavedOptionsState>()(
    persist(
        (set) => ({
            savedOptions: [['Acabou', 'Pouco', 'Suficiente', 'Bastante']],
            saveOptions: (options) =>
                set((state) => ({
                    savedOptions: [...state.savedOptions, options],
                })),
            removeSavedOptions: (options) =>
                set((state) => ({
                    savedOptions: state.savedOptions.filter(
                        (opt) =>
                            opt.length === options.length &&
                            opt.every(
                                (value, index) => value !== options[index]
                            )
                    ),
                })),
        }),
        {
            name: 'saved-options-storage',
        }
    )
);

export default useSavedOptionsStore;
