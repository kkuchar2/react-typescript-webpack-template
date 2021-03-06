import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import { getDataReducer } from "./reducers/api";

export const store = configureStore({
    reducer: {
        getData: getDataReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//////////////////////////////////////////////////////////////////////////////////////
export const API_URL = 'https://openlibrary.org/search';
//////////////////////////////////////////////////////////////////////////////////////