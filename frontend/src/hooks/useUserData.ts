import useUserDataStore from '../stores/userDataStore';
import useLocalDataStore from '../stores/localDataStore';
import useAuth from './useAuth';

import ListItemType from '../types/ListItemTypes';
import Logs from '../types/Logs';

export default function useUserData() {
    const { guest, accessToken } = useAuth();
    const { userItems, userLogs } = useUserDataStore();
    const { localItems, localLogs } = useLocalDataStore();

    const items: ListItemType[] = accessToken
        ? userItems
        : guest
        ? localItems
        : [];

    const logs: Logs[] = accessToken ? userLogs : guest ? localLogs : [];

    return { items, logs };
}
