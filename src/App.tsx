import React from "react";

import {store} from "app_redux/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

import Content from "./Content";
import './i18n';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;

    .root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      background: #272822;
      
      .page {
        overflow-y: auto;
        height: 100%;
        min-height: 0;
        flex: 1;
        user-select: none;
        box-sizing: border-box;
      }
    }
  }
`;

export const App = () => {
    return <Provider store={store}>
        <GlobalStyle/>
        <BrowserRouter>
            <Content/>
        </BrowserRouter>
    </Provider>;
};