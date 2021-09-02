import React, {useEffect} from "react";

import {selectorData, tryGetData} from "app_redux/reducers/api";
import {useAppDispatch} from "app_redux/store";
import {Text} from "kuchkr-react-component-library";
import ReactJson from 'react-json-view';
import {useSelector} from "react-redux";

import {
    responseTextTheme,
    StyledCatImage,
    StyledHomePage,
    StyledResponseBox,
    titleTheme
} from "./style";

const HomePage = () => {

    const selector = useSelector(selectorData);

    const dispatch = useAppDispatch();

    const data = Object.keys(selector.responseData).length === 0 ? null : selector.responseData;

    useEffect(() => {
        dispatch(tryGetData());
    }, []);

    return <StyledHomePage>
        <Text theme={titleTheme} text={'🚀'}/>
        <Text theme={titleTheme} text={'Hello there'}/>
        <StyledCatImage src={'https://cataas.com/cat/gif/says/Hello?filter=sepia&color=orange&size=40&type=or'}/>
        <StyledResponseBox>
            { !data ? <Text theme={responseTextTheme} text={'Loading openlibrary.org...'} /> : <ReactJson enableClipboard={false} theme='monokai' src={data} /> }
        </StyledResponseBox>
    </StyledHomePage>;
};

export default HomePage as React.FC;