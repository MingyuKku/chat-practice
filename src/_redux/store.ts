import { configureStore } from '@reduxjs/toolkit';
import { memberSlice } from './member/slice';


const store = configureStore({
    reducer: {
        memberReducer: memberSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// getState와 dispatch를 내보내기
export const getState: () => RootState = store.getState;
export const dispatch: AppDispatch = store.dispatch;

export default store;