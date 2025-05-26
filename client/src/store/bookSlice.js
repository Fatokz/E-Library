import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: "books",
    initialState: {
        all: [],
        favorites: [],
    },
    reducers: {
        setBooks: (state, action) => {
            state.all = action.payload;
        },
        addFavorite: (state, action) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((id) => id !== action.payload);
        },
    },
});

export const { setBooks, addFavorite, removeFavorite } = booksSlice.actions;
export default booksSlice.reducer;