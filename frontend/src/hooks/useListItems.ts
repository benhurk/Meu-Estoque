import useListStore from '../stores/listStore';
import useLocalListStore from '../stores/localListStore';
import ListItemType from '../types/ListItemTypes';
import useAuth from './useAuth';

export default function useListItems() {
    const { guest, accessToken } = useAuth();
    const localItems = useLocalListStore((state) => state.localItems);
    const fetchedItems = useListStore((state) => state.fetchedItems);

    const items: ListItemType[] = accessToken
        ? fetchedItems
        : guest
        ? localItems
        : [];

    return items;
}
