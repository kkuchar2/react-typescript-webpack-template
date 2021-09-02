import {Dictionary} from "@reduxjs/toolkit";
import {AppDispatch} from "app_redux/store";
import axios from "axios";
import Cookies from "universal-cookie/es6";

//////////////////////////////////////////////////////////////////////////////////////
const API_URL = 'https://openlibrary.org/works/OL15626917W.json';
//////////////////////////////////////////////////////////////////////////////////////

const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

export const buildApiUrl = (name: string) => API_URL;

const sendPostWithoutCookies = async (url: string, body = {}) => {
    console.debug(`%c[POST]: ${url}, body: ${JSON.stringify(body)}`, "color: #ccff44");
    return axios.post(url, body);
};

const sendGetWithoutCookies = async (url: string, body = {}) => {
    console.debug(`%c[GET]: ${url}`, "color: #ccff44");
    return axios.get(url, {
        headers: {
            'Accept': 'application/json'
        }
    });
};

const sendPostWithCookies = async (url: string, body = {}) => {
    console.debug(`%c[POST]: ${url}, body: ${JSON.stringify(body)}`, "color: #ccff44");

    const csrfToken = new Cookies().get('csrftoken');

    return axios.post(url, body, {
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFTOKEN': csrfToken
        }
    });
};

const sendFileWithCookies = async (url: string, file: File) => {
    console.debug(`%c[POST]: ${url}, file`, "color: #ccff44");

    let data = new FormData(); // creates a new FormData object
    data.append('title', 'ProfileImage');
    data.append('text', 'random_text');
    data.append('img', file); // add your file to form data

    const csrfToken = new Cookies().get('csrftoken');

    console.log('CSRF TOKEN:');
    console.log(csrfToken);

    return axios.post(url, data, {
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFTOKEN': csrfToken
        },
        onUploadProgress: progressEvent => console.log(`Progress uploading file: ${progressEvent.loaded}`)
    });
};

interface RequestParams {
    path: string,
    onBefore: Function,
    onSuccess: Function,
    onFail: Function,
    useCookies: boolean,
    body?: Dictionary<any>,
    file?: File
}

const sendPostAndParse = (requestFunc: Function, {
    path,
    onBefore,
    onSuccess,
    onFail,
    body = {},
    file
}: RequestParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            const isBody = Object.keys(body).length > 0;

            dispatch(onBefore({errors: [], path: path, body: isBody ? body : {}}));
            //await new Promise(r => setTimeout(r, 1000));
            const payload = isBody ? body : (file ? file : {});

            parseResponse(path, dispatch, await requestFunc(buildApiUrl(path), payload), onSuccess, onFail);
        } catch (e: any) {
            console.log(e);

            if (e.message === 'Network Error') {
                dispatch(onFail({errors: createNetworkError(path), path: path}));
                return;
            }

            if (!e.response) {
                dispatch(onFail({errors: {"any": ["unknown_error"]}, path: path}));
                return;
            }

            if (e.response.status === 401) {
                dispatch(onFail({errors: {"any": ["unauthorized"]}, path: path}));
            } else {
                dispatch(onFail({"any": ["unknown_error"]}));
            }
        }
    };
};

const sendGetAndParse = (requestFunc: Function, { path, onBefore, onSuccess, onFail }: RequestParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(onBefore({errors: [], path: path, body: {}}));
            parseResponse(path, dispatch, await requestFunc(buildApiUrl(path)), onSuccess, onFail);
        } catch (e: any) {
            console.log(e);

            if (e.message === 'Network Error') {
                dispatch(onFail({errors: createNetworkError(path), path: path}));
                return;
            }

            if (!e.response) {
                dispatch(onFail({errors: {"any": ["unknown_error"]}, path: path}));
                return;
            }

            if (e.response.status === 401) {
                dispatch(onFail({errors: {"any": ["unauthorized"]}, path: path}));
            } else {
                dispatch(onFail({"any": ["unknown_error"]}));
            }
        }
    };
};

const parseResponse = (path: string, dispatch: AppDispatch, response: any, onSuccess: any, onFail: any) => {

    if (!response) {
        dispatch(onFail("No response"));
        return;
    }

    console.log(`%c-------------- Response for: ${response.config.url} --------------------`, "color: #11ccaa");
    console.log(response);
    console.log(`%c-------------------------------------------------------------------------------------------`, "color: #11ccaa");

    const responseData = response.data;

    if (responseData === undefined) {
        dispatch(onFail({errors: {"any": ["no_response_data"]}, path: path}));
        return;
    }

    dispatch(onSuccess({errors: [], path: path, data: responseData}));
};

const createNetworkError = (source: string) => {
    return {
        "generic": [createError("network_error", "NETWORK_ERROR", source)]
    };
};

const createError = (errorType: string, errorMessage: string, errorSource: string) => {
    return {
        'type': errorType,
        'message': errorMessage,
        'source': errorSource
    };
};

export const sendPost = (params: RequestParams) => sendPostAndParse(params.useCookies ? sendPostWithCookies : sendPostWithoutCookies, params);

export const sendGet = (params: RequestParams) => sendGetAndParse(sendGetWithoutCookies, params);

export const sendFilePost = (params: RequestParams) => sendPostAndParse(sendFileWithCookies, params);