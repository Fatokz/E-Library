import { createSlice } from "@reduxjs/toolkit";

const borrowSlice = createSlice({
    name: "borrows",
    initialState: {
        all: [],
    },
    reducers: {
        setBorrows: (state, action) => {
            state.all = action.payload;
        },
        updateBorrow: (state, action) => {
            const updated = action.payload.borrow ? action.payload.borrow : action.payload;
            const idx = state.all.findIndex((b) => {
                const borrowObj = b.borrow ? b.borrow : b;
                return borrowObj._id === updated._id;
            });
            if (idx !== -1) {
                if (state.all[idx].borrow) {
                    state.all[idx].borrow = { ...state.all[idx].borrow, ...updated };
                    state.all[idx].returned = updated.returned ?? updated.status === "returned";
                } else {
                    state.all[idx] = { ...state.all[idx], ...updated };
                }
            }
        },
        addBorrow: (state, action) => {
            state.all.push(action.payload);
        },
    },
});

export const { setBorrows, updateBorrow, addBorrow } = borrowSlice.actions;
export default borrowSlice.reducer;