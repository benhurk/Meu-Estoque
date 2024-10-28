import { configureStore } from "@reduxjs/toolkit";

import listReducer from "./reducers/list";
import modalReducer from "./reducers/modal";

const store = configureStore({
    reducer: {
        list: listReducer,
        modal: modalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;