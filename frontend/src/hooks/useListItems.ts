import useListStore from '../stores/listStore';
import useLocalListStore from '../stores/localListStore';
import ListItemType from '../types/ListItemTypes';
import useAuth from './useAuth';

export default function useListItems() {
    const { guest, accessToken } = useAuth();
    const localItems = useLocalListStore((state) => state.localItems);
    const userItems = useListStore((state) => state.userItems);

    const items: ListItemType[] = accessToken
        ? userItems
        : guest
        ? localItems
        : [];

    return items;
}
