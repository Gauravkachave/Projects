import React from 'react';
import { BrowserRouter as Router,Switch} from 'react-router-dom';
import {withRouter,Route} from 'react-router';
import AuthRoutes from './NestedRoutes/AuthRoutes';
import Welcome from '../components/Welcome/Welcome';
import ContactRoutes from '../routes/NestedRoutes/ContactRoutes';
import ManagerRoutes from '../routes/NestedRoutes/ManagerRoutes';

const Routers = (props) => {
    return ( 
            <Router>
                <Switch>
                    <Route 
                    exact={true} 
                    path='/' 
                    component={Welcome}/>
                    
                    <Route
                    path='/auth'
                    component={AuthRoutes}
                    />

                    <Route
                    path='/contacts'
                    component={ContactRoutes}
                    />

                    <Route
                    path='/manager'
                    component={ManagerRoutes}
                    />
                </Switch>
                </Router>
     );
}
export default withRouter(Routers);