import { configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore,
} from 'redux-persist';

import formReducer from './reducers/form';
import {
    persistedListReducer,
    persistedLogsReducer,
    persistedSavedOptionsReducer,
} from './persistedReducers';

const store = configureStore({
    reducer: {
        list: persistedListReducer,
        savedOptions: persistedSavedOptionsReducer,
        form: formReducer,
        logs: persistedLogsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    REHYDRATE,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
