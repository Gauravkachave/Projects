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

const ManageDripTemplate = Loader (() => 
import ('../../containers/Manager/ManagerTemplates/ManageDripTemplates'),
);

const ManageDripFolders = Loader (() =>
import ('../../containers/Manager/ManagerTemplates/ManageDripFolders'),
);

const AddDripFolder = Loader (() =>
import ('../../containers/Manager/ManagerTemplates/AddDripFolder'),
);

const ManageBirthday = Loader (() =>
import('../../containers/Manager/ManagerTemplates/ManageBirthday'),
);

const ManageDripCategory = Loader (()=>
import( '../../containers/Manager/ManagerTemplates/ManageDripCategory'),
);

const AddDripCategory = Loader (() =>
import ( '../../containers/Manager/ManagerTemplates/AddDripCategory'),
);

const AddDripTemplate =Loader (() => 
import ('../../containers/Manager/ManagerTemplates/AddDripTemplate'),
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

                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-drip-templates`}
                    component={ManageDripTemplate}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageDripTemplates | ManageDripTemplates'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-drip-folders`}
                    component={ManageDripFolders}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageDripFolders | ManageDripFolders'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/add-drip-folder`}
                    component={AddDripFolder}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageDripFolders | AddDripFolder'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-drip-categories`}
                    component={ManageDripCategory}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageDripCategory'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/add-drip-category`}
                    component={AddDripCategory}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageDripCategory | AddDripCategory'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/manage-birthday`}
                    component={ManageBirthday}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | ManageBirthday'
                />

                <AppRoute
                    exact={true}
                    path={`${match.path}/add-drip-templates`}
                    component={AddDripTemplate}
                    requireAuth={auth}
                    layout={dashboardLayout}
                    type='private'
                    title='Manager | AddDripTemplate'
                />


            </Switch>
        </React.Fragment>
        
     );
}
 
export default ManagerRoutes;