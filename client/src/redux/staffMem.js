import { createSlice } from "@reduxjs/toolkit";

export const staffMemSlice = createSlice({
    name: 'staffMem',
    initialState : {
        staffMem : null
    },
    reducers: {
        setStaffMem : (state, action) => {
            state.staffMem = action.payload;
        }
    }
});

export const {setStaffMem} = staffMemSlice.actions;