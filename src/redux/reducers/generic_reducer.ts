import {
    createSlice,
    Dictionary,
    PayloadAction,
    Slice,
    SliceCaseReducers,
    ValidateSliceCaseReducers
} from "@reduxjs/toolkit";

import {sendPost, sendGet} from "redux/api";

export interface IResponsePayload {
    path: string,
    errors: any, // TODO
    data: any // TODO
}

export interface BaseRequestSliceState {
    path: string,
    requestSent: boolean,
    responseReceived: boolean,
    responseData: Dictionary<any> // TODO,
    errors: Array<any> // TODO
}

export interface BeforeRequestPayload {
    path: string
}

export const createBaseRequestSlice = <Reducers extends SliceCaseReducers<BaseRequestSliceState>>({ name = '', reducers}: {
    name: string
    reducers?: ValidateSliceCaseReducers<BaseRequestSliceState, Reducers>
}) => {
    return createSlice({
        name,
        initialState: {
            path: '',
            requestSent: false,
            responseReceived: false,
            responseData: {},
            errors: []
        } as BaseRequestSliceState,
        reducers: {
            onRequestSent: (state, action: PayloadAction<BeforeRequestPayload>) => {
                const {path = ''} = action.payload ? action.payload : {};
                state.path = path;
            },
            onRequestSuccess: (state, action: PayloadAction<IResponsePayload>) => {
                const {errors = [], path = '', data = {}} = action.payload ? action.payload : {};
                state.errors = errors;
                state.path = path;
                state.requestSent = false;
                state.responseReceived = true;
                state.responseData = action.payload.data;
            },
            onRequestFailed: (state: BaseRequestSliceState, action: PayloadAction<IResponsePayload>) => {
                const {errors = [], path = '', data = {}} = action.payload ? action.payload : {};
                state.path = path;
                state.requestSent = false;
                state.responseReceived = true;
                state.responseData = data;
                state.errors = errors;
            },
            onReset: (state: BaseRequestSliceState) => {
                state.path = '';
                state.requestSent = false;
                state.responseReceived = false;
                state.responseData = {};
                state.errors = [];
            },
            ...reducers,
        },
    });
};

export const sendPostRequest = (path: string, body: object, slice: Slice<BaseRequestSliceState>) => {
    return sendPost({
        path: path,
        onBefore: slice.actions.onRequestSent,
        onSuccess: slice.actions.onRequestSuccess,
        onFail: slice.actions.onRequestFailed,
        body: body,
        useCookies: false
    });
};

export const sendGetRequest = (path: string, slice: Slice<BaseRequestSliceState>) => {
    return sendGet({
        path: path,
        onBefore: slice.actions.onRequestSent,
        onSuccess: slice.actions.onRequestSuccess,
        onFail: slice.actions.onRequestFailed,
        body: {},
        useCookies: false
    });
};