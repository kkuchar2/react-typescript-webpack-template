import {withSuspense} from "util/withSuspense";

import React, {lazy} from "react";

import {Button} from "kuchkr-react-component-library";

const HomePage = lazy(() => import (/* webpackChunkName: "home" */ "pages/HomePage/HomePage"));

export const routes = [
    {
        path: "/",
        component: withSuspense(HomePage),
        icon: '',
        title: "",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: false
    },
];

const getCurrentRoute = () => routes.filter(v => v.path === window.location.pathname)[0];

export const isOnAuthenticatedPage = () => {
    const route = getCurrentRoute();

    if (route) {
        return route.authRequired;
    }
    return false;
};