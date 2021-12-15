import React from 'react';
import { Switch } from 'react-router';
import Loader from '../../helper/loaders';
import { auth } from '../../utils/authentication/Auth';
import AppRoute from '../AppRoute';
import { dashboardLayout } from '../../layouts/DashboardLayout';

const AddTemplate =Loader (()=>
import('../../containers/Manager/ManagerTemplates/AddTemplate'),
);

const ManageTemplates =Loader (()=>
import('../../containers/Manager/ManagerTemplates/ManageTemplates'),
);

const ManageCategories =Loader (()=>
import('../../containers/Manager/ManagerTemplates/ManageCategories'),
);

const ManageFolder =Loader(()=>
import('../../containers/Manager/ManagerTemplates/ManageFolder'),
);

const CreateFolder =Loader (()=>
import('../../containers/Manager/ManagerTemplates/CreateFolder'),
);

const AddCategory = Loader (()=>
import ('../../containers/Manager/ManagerTemplates/AddCategory'),
);

const EditNormalTemplate = Loader (()=>
import ('../../containers/Manager/ManagerTemplates/EditNormalTemplate'),
);

const ManagerRoutes = (props) => {
const { match } =props;
    return ( 
        <React.Fragment>
            <Switch>

                <AppRoute
                    exact={true}
                    path={`${match.path}/add-private-template`}
                    component={AddTemplate}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | AddTemplate'
                />
                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-normal-template`}
                    component={ManageTemplates}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageTemplates'
                />
                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-normal-category`}
                    component={ManageCategories}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageCategories'
                />
                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-normal-folder`}
                    component={ManageFolder}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageFolder'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/create-normal-folder`}
                    component={CreateFolder}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageFolder | CreateFolder'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/add-normal-category`}
                    component={AddCategory}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageCategory | AddCategory'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/edit-normal-template/:id`}
                    component={EditNormalTemplate}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageCategory | EditTemplate'
                />

            </Switch>
        </React.Fragment>
        
     );
}
 
export default ManagerRoutes;