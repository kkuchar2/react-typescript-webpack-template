import {withSuspense} from "util/withSuspense";

import React, {lazy, useCallback} from "react";

import {Route, Switch} from "react-router-dom";

import {routes} from "./routes";

const NotFound = lazy(() => import (/* webpackChunkName: "not-found" */ "pages/NotFoundPage/NotFoundPage"));

const Content = () => {
    const mapRoutesToContent = useCallback(() => routes.filter((v: any) => v.enabled)
        .map((p, k) => {
            return <Route key={k} exact={p.exact} path={p.path} component={p.component}/>;
        }), []);

    return <Switch>
        {mapRoutesToContent()}
        {<Route component={withSuspense(NotFound)} key={0}/>}
    </Switch>;
};

export default Content;