import { Redirect, Route } from 'react-router-dom';
 import ErrorBoundary from '../layouts/ErrorLayout/ErrorBoundry';
import Loader from '../helper/loaders';
import React from 'react';

const AppError = Loader(() =>
    import('../layouts/ErrorLayout/AppError')
);

const AppRoute = ({
    component: Component,
    layout: Layout,
    requireAuth,
    to = '/',
    store,
    type = 'private',
    title = '',
    ...rest
}) => (
        <ErrorBoundary fallbackComponent={AppError}>
            <Route
                {...rest}
                render={props => {
                    document.title = `${title} - ${process.env.REACT_APP_DOCUMENT_TITLE}`;
                    const isLogin = requireAuth && requireAuth(store);
                    if (isLogin && props.location.pathname === '/') {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/contacts/create-public-group',
                                    state: { from: props.location }
                                }}
                            />
                        );
                    }
                    if (type === 'public') {
                        return (
                            <Layout>
                                <Component {...props} />
                            </Layout> 
                        );
                    }
                    return isLogin || props.location.pathname === '/' ? (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    ) : (
                            <Redirect
                                to={{
                                    pathname: to,
                                    state: { from: props.location }
                                }}
                            />
                        );
                }}
            />
        </ErrorBoundary>
    );

export default AppRoute;



// import React from 'react';
// import ErrorBoundary from '../layouts/ErrorLayout/ErrorBoundry';
// import Loader from '../helper/loaders';

// const AppError = () => {
//     import('../layouts/ErrorLayout/AppError');
// }
// const AppRoute = ({
// component : Component,
// layout : Layout,
// requireAuth,
// to = '/',
// type = 'private',
// title = '',
// ...rest
// }) => (
//     <ErrorBoundary fallbackComponent={AppError}>
//         <Route
//             {...rest}
//             render={props => {
//                 document.title = `${title} - ${process.env.REACT_APP_DOCUMENT_TITLE}`;
//                 const isLogin = requireAuth && requireAuth(store);
//                 if (isLogin && props.location.pathname === '/') {
//                     return (
//                         <Redirect
//                             to={{
//                                 pathname: '/campaigns/create-campaign',
//                                 state: { from: props.location }
//                             }}
//                         />
//                     );
//                 }
//                 if (type === 'public') {
//                     return (
//                         <Layout>
//                             <Component {...props} />
//                         </Layout> 
//                     );
//                 }
//                 return isLogin || props.location.pathname === '/' ? (
//                     <Layout>
//                         <Component {...props} />
//                     </Layout>
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: to,
//                                 state: { from: props.location }
//                             }}
//                         />
//                     );
//             }}
//         />
//     </ErrorBoundary>
// );

// export default AppRoute;
