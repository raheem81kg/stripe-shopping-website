import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for each item in the array
interface Item {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
}

interface Quantity {
    id: string;
    amount: number;
}

// Define a type for the slice state
interface CartState {
    items: Item[];
}

// Define the initial state using that type
const initialState: CartState = {
    items: [],
};

export const cartItemsSlice = createSlice({
    name: "cartItems",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Item>) => {
            state.items = [...state.items, action.payload];
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<Quantity>) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: action.payload.amount };
                } else {
                    return item;
                }
            });
        },
        // Takes an id and quantity as object then finds item and increment or decrements the quantity
        incrementQuantity: (state, action: PayloadAction<Quantity>) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: (item.quantity += action.payload.amount) };
                } else {
                    return item;
                }
            });
        },
        setCart: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, incrementQuantity, setCart } = cartItemsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cartItems.items;

export default cartItemsSlice.reducer;
