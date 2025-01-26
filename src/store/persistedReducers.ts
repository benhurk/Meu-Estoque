import storage from 'redux-persist/lib/storage';

import listReducer from './reducers/list';
import savedOptionsReducer from './reducers/savedOptions';
import logsReducer from './reducers/logs';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};

export const persistedListReducer = persistReducer(persistConfig, listReducer);

export const persistedSavedOptionsReducer = persistReducer(
    persistConfig,
    savedOptionsReducer
);

export const persistedLogsReducer = persistReducer(persistConfig, logsReducer);
