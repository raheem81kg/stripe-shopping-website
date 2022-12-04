import { configureStore } from "@reduxjs/toolkit";
import showCartReducer from "./slice/showCartSlice";
import cartItemsReducer from "./slice/cartItemsSlice";

export const store = configureStore({
    reducer: {
        showCart: showCartReducer,
        cartItems: cartItemsReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
