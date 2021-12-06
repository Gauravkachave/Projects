import React from 'react';
import {Switch,Route} from "react-router";
import Loader from '../../helper/loaders';
import PublicLayout from '../../layouts/PublicLayout/PublicLayout';
import AppRoute from '../AppRoute';

const SignUp = Loader(() => 
        import('../../containers/Auth/Signup'),
);

const SignIn = Loader (() => 
import('../../containers/Auth/Signin'),
);

const ForgotPassword = Loader (()=>
    import('../../containers/Auth/ForgotPassword'),
);

const RouteComponent = (props) => {
const { match } =props;
    return ( 
        <Switch>
            <AppRoute
            exact={true}
            path={`${match.path}/signup`}
            component={SignUp}
            layout={PublicLayout}
            type="public"
            title='Signup'
            />

            <AppRoute
            path={`${match.path}/signin`}
            component={SignIn}
            layout={PublicLayout}
            type="public"
            title='Signin'
            />

            <AppRoute
            exact={true}
            path={`${match.path}/forgot-password`}
            component={ForgotPassword}
            layout={PublicLayout}
            type='public'
            title='Sign | Forgot Password'
            />
        </Switch>
     );
}
export default RouteComponent;