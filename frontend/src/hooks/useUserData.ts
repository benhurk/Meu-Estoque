import useUserDataStore from '../stores/userDataStore';
import useLocalItemsStore from '../stores/localItemsStore';
import useAuth from './useAuth';
import useLocalLogsStore from '../stores/localLogsStore';

import ListItemType from '../types/ListItemTypes';
import Logs from '../types/Logs';

export default function useUserData() {
    const { guest, accessToken } = useAuth();
    const { userItems, userLogs } = useUserDataStore();
    const localItems = useLocalItemsStore((state) => state.localItems);
    const localLogs = useLocalLogsStore((state) => state.localLogs);

    const items: ListItemType[] = accessToken
        ? userItems
        : guest
        ? localItems
        : [];

    const logs: Logs[] = accessToken ? userLogs : guest ? localLogs : [];

    return { items, logs };
}
