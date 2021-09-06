import {createBaseRequestSlice, sendGetRequest} from "redux/reducers/generic_reducer";
import {AppDispatch, RootState} from "redux/store";

export const getDataSlice = createBaseRequestSlice({name: 'getData'});

export const tryGetData = () => sendGetRequest('/authors.json', getDataSlice);

export const tryResetDataState = () => async (dispatch: AppDispatch) => dispatch(onReset());

export const selectorData = (state: RootState) => state.getData;

export const {onReset} = getDataSlice.actions;

export default getDataSlice.reducer;