import React from 'react';
import {Switch} from "react-router";
import Loader from '../../helper/loaders';
import {dashboardLayout} from '../../layouts/DashboardLayout/';
import AppRoute from '../AppRoute';
import { auth } from '../../utils/authentication/Auth';

const CreatePublicGroup =Loader(()=>
    import('../../containers/Contacts/CreatePublicGroup'),
);

const ManagePublicGroups =Loader (()=>
import('../../containers/Contacts/ManagePublicGroups'),
);

const EditGroup = Loader (()=>
import('../../containers/Contacts/EditGroup'),
);

const CreateSyncGroup = Loader (()=>
    import('../../containers/Contacts/CreateSyncGroup'),
);

const ManageSyncGroups = Loader (()=>
import('../../containers/Contacts/ManageSyncGroups'),
);

const EditSyncGroups = Loader (()=>
import('../../containers/Contacts/EditSyncGroup'),
)


const ContactRoutes = (props) => {
const { match } =props;
    return ( 
        <React.Fragment>
            <Switch>
                <AppRoute
                    exact={true}
                    path={`${match.path}/create-public-group`}
                    component={CreatePublicGroup}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Groups | CreatePublicGroup'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-public-groups`}
                    component={ManagePublicGroups}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Groups | ManagePublicGroups'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/edit-public-groups/:id`}
                    component={EditGroup}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Groups | EditPublicGroups'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/create-sync-group`}
                    component={CreateSyncGroup}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Groups | CreatePrivateGroup'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-sync-groups`}
                    component={ManageSyncGroups}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Groups | ManageSyncGroups'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/edit-sync-groups/:id`}
                    component={EditSyncGroups}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Groups | EditSyncGroups'
                />
                
            </Switch>
        </React.Fragment>
      
     );
}
 
export default ContactRoutes;