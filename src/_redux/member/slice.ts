import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./types";

const initState: State = {
    se: null,
    nick_nm1: '',
    nick_nm2: '',
    appVer: null
}

export const memberSlice = createSlice({
    name: 'memberSlice',
    initialState: initState,
    reducers: {
        setMember(state, action: PayloadAction<Partial<State>>) {
            if (action.payload.se) state.se = action.payload.se;
            if (action.payload.nick_nm1) state.nick_nm1 = action.payload.nick_nm1;
            if (action.payload.nick_nm2) state.nick_nm2 = action.payload.nick_nm2;
            if (action.payload.appVer) state.appVer = action.payload.appVer;
        },
    },
    extraReducers: (builder) => {
    }
})

export const {
    setMember,
} = memberSlice.actions;