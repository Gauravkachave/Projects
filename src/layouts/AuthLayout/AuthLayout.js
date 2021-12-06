import React, { useState, useEffect } from 'react';
import AuthHeader from '../../components/Auth/Header';
import Footer from '../../components/Footer/Footer';
import { validateTokenAPI } from '../../helper/services/API/Users';
import { UserAccountContext } from '../../contextHooks';
import { userLogout } from '../../helper/commonFunction';
import Snackbar from '../../components/Snackbar/Snackbar';
import Loader from '../../helper/loaders/ComponentLoader';


const AuthLayout = (props) => {
    const [userAccount, setUserAccount] = useState({});
    const [snackbarState, setSnackbarState] = useState({
        messageInfo: {
            open: false,
            message: null,
            variant: 'success'
        }
    });
    
    useEffect(()=>{
        validateTokenAPI().then((res)=>{
            if(res.success && res.data){
                setUserAccount(res.data);  
            }
            else {
                setSnackbarState({
                    messageInfo: {
                        open: true,
                        message: 'Session Expired! Logout Successfully',
                        variant: 'success'
                    }
                });
                userLogout(props.children.props);
            }
        }).catch((error)=>{
            setSnackbarState({
                messageInfo: {
                    open: true,
                    message: 'Something went wrong!',
                    variant: 'error'
                }
            });
        });
    },[]);
    return (
        <React.Fragment>
            {snackbarState.messageInfo.open && <Snackbar
                message={snackbarState.messageInfo.message}
                open={snackbarState.messageInfo.open}
                closeSnackBar={() => {
                    setSnackbarState({ messageInfo: { open: false, message: null, variant: 'success' } });
                }}
                variant={snackbarState.messageInfo.variant}
                autoHideDuration={5000}
            />}
            {
                Object.keys(userAccount).length > 0 ?
                    <React.Fragment>
                        <UserAccountContext.Provider value={userAccount}>
                            <AuthHeader 
                                prps = {props.children.props}
                            />
                            {props.children}
                        </UserAccountContext.Provider>
                        <Footer />
                    </React.Fragment>
                    : <Loader />
            }
        </React.Fragment>
    );
}
export default AuthLayout;

