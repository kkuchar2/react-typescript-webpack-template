import React from 'react';

import {Text} from "kuchkr-react-component-library";

import {StyledLink, StyledNotFound, StyledNotFoundTextWithIcon, textTheme} from "./style";

const NotFoundPage = () => {
    return <StyledNotFound>
        <StyledNotFoundTextWithIcon>
            <Text text={'Page not found'} theme={textTheme}/>
        </StyledNotFoundTextWithIcon>
        <StyledLink style={{marginLeft: 10, marginBottom: 0}} to={'/'} className={"signInLink"}>Home</StyledLink>
    </StyledNotFound>;
};

export default NotFoundPage;