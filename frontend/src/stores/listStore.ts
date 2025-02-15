import { create } from 'zustand';

import ListItemType from '../types/ListItemTypes';

type ListState = {
    fetchedItems: ListItemType[];
};

type ListActions = {
    setListData: (data: ListItemType[]) => void;
};

const useListStore = create<ListState & ListActions>((set) => ({
    fetchedItems: [],
    setListData: (data) =>
        set(() => ({
            fetchedItems: data,
        })),
}));

export default useListStore;
