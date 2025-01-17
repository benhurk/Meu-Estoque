import { configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import listReducer from './reducers/list';
import formReducer from './reducers/form';
import savedOptionsReducer from './reducers/savedOptions';

const persistedListReducer = persistReducer(
    { key: 'root', storage },
    listReducer
);

const persistedSavedOptionsReducer = persistReducer(
    { key: 'root', storage },
    savedOptionsReducer
);

const store = configureStore({
    reducer: {
        list: persistedListReducer,
        savedOptions: persistedSavedOptionsReducer,
        form: formReducer,
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
