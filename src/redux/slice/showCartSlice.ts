import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface CartState {
    open: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
    open: false,
};

export const showCartSlice = createSlice({
    name: "cart",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        showCart: (state) => {
            state.open = true;
        },
        hideCart: (state) => {
            state.open = false;
        },
    },
});

export const { showCart, hideCart } = showCartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShowCart = (state: RootState) => state.showCart.open;

export default showCartSlice.reducer;
