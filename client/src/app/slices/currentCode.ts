import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Submission } from "@/lib/types";

const initialState: { submission: Submission | null } = {
    submission: null,
};

export const currentCodeSlice = createSlice({
    name: "currentCode",
    initialState,
    reducers: {
        setCurrentCode: (state, action: PayloadAction<Submission>) => {
            state.submission = action.payload;
        },
    },
});

export const { setCurrentCode } = currentCodeSlice.actions;

export default currentCodeSlice.reducer;
