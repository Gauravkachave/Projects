import React,{useState,useEffect} from 'react';
import { withStyles, Typography} from '@material-ui/core';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Span from '@material-ui/core/Box';
import { UserAccountContext } from '../../contextHooks';
import { validateTokenAPI } from '../../helper/services/API/Users';
import Snackbar from '../../components/Snackbar/Snackbar';
import Loader from '../../helper/loaders/ComponentLoader';

const styles = (theme) => ({
    BannerContainer:{background:'#333', padding:'6px 10px', borderLeft:'4px solid #ffa500', borderRadius:4, marginLeft:29, marginRight:29, marginBottom:12},
    BannerText:{color:'#fff', fontSize:13, fontWeight:500},
    mainContent: {
        marginRight: 32,
        marginLeft: 100,
        marginTop: 80
    },
    [theme.breakpoints.only('xs')]: {
        mainContent: {
            marginRight: 12,
            marginLeft: 12,
            marginTop: 80
        }
    },
});

const DashboardLayout = (Props) => {
    const { classes, children } = Props;
    const childrenProps = children.props;
    const [userAccount,setUserAccount]=useState({});
    const [snackbarState,setSnackbarState]= useState({
        messageInfo:    {
            open:false,
            message:null,
            variant:'success'
        }
    });

    useEffect(() => {
        (async () => {
            validateTokenAPI().then((res)=>{
                if(res.success){
                    setUserAccount(res.data);
                }else{
            setSnackbarState({
                messageInfo:{
                    open:true,
                    message:'Something went wrong!',
                    variant:'success'
                }
            })
        }
            })
        })
        ().catch(err => {
            console.error('Caught error :',err);
            setSnackbarState({
                messageInfo: {
                    open: true,
                    message: 'Something went Wrong!',
                    variant: 'error'
                }
            });
        });
    }, [childrenProps]);

    return ( 
        <React.Fragment>
            {snackbarState.messageInfo.open && <Snackbar
            message={snackbarState.messageInfo.message}
            open={snackbarState.messageInfo.open}
            closeSnackBar={()=>{
                setSnackbarState({
                    messageInfo:{
                        open:false,
                        message:null,
                        variant:'success'
                    }
                })
            }}
            variant={snackbarState.messageInfo.variant}
            autoHideDuration={5000}
            />} 
            {
                Object.keys(userAccount).length > 0 ?
                <React.Fragment>
                        <UserAccountContext.Provider value={userAccount}>
                        <Navbar/>
                        <Sidebar/>
                        <Span className={classes.mainContent}>
                            <main>
                                {children}
                            </main>
                        </Span>
                        </UserAccountContext.Provider>
                 </React.Fragment>
                    :<Loader />
            }
        </React.Fragment>
     );
}
export default withStyles(styles)(DashboardLayout);
 