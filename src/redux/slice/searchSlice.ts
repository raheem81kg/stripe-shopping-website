import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface SearchState {
    text: string;
    open: boolean;
}

// Define the initial state using that type
const initialState: SearchState = {
    text: "",
    open: false,
};

export const searchSlice = createSlice({
    name: "search",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSearchText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        showSearch: (state) => {
            state.open = true;
        },
        closeSearch: (state) => {
            state.open = false;
        },
    },
});

export const { setSearchText, showSearch, closeSearch } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShowSearch = (state: RootState) => state.search.open;
export const selectSearchText = (state: RootState) => state.search.text;

export default searchSlice.reducer;
