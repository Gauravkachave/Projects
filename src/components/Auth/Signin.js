import React from 'react';
import { Link } from 'react-router-dom';
import CircularLoader from '../../helper/loaders/CircularLoader';
import {
    Grid, withStyles, FormControl, TextField, Typography,Checkbox, Button, Divider,FormHelperText
} from '@material-ui/core';
import Span from "@material-ui/core/Box";
import Logo from "../../Assets/logo.png"
import GoDaddyImage from "../../Assets/godaddy.png"
import Authorize from "../../Assets/Authorize.png"

const styles = (theme) => ({
    Logo: { width: 97, marginTop: 14, marginLeft: 116 },
    SignupText: { fontSize: 30, fontWeight: 'bold', marginLeft: 114, marginTop: 10 },
    WelcomContainer: { background: '#fa6e89', height: '100vh' },
    textField: { fontSize: 13, color: '#2b2b2b', padding: '12px 13px', background: '#fff' },
    cssLabel: {
        color: '#908f8f',
        transform: "translate(14px, 13px) scale(1)",
        fontSize: 13,
    },
    LableShrink: { fontSize: 14, transform: 'translate(17px, -4px) scale(0.75) !important' },

    [theme.breakpoints.down('md')]: {
        AllPadding: { padding: '0px 20px' },
        Logo: { marginLeft: 20 },
        SignupText: { marginLeft: 20, },
        ForgetPassText: { fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"0px !important" },
    },
    [theme.breakpoints.only('sm')]: {
        CheckboxIcon: { margin: '-10px 0px 0px -12px !important', },
        ForgetPassText: { fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"0px !important" },

    },
    [theme.breakpoints.only('lg')]: {
        inputWidth: { width: 470, marginLeft: 7 },
        CheckboxIcon: { margin: '-12px 0px 0px 24px !important', },
        ForgetPassText: { fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"30px" },

    },
    [theme.breakpoints.only('xs')]: {
        WelcomContainer: { height: 305 },
        CheckboxIcon: { margin: '-12px 0px 0px -9px !important' },
        ForgetPassText: { fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"0px !important" },

    },
    SignUpBtn: { borderRadius: 50, borderColor: '#fb6e8a', padding: '10px 55px', fontSize: 13, color: '#fb6e8a', marginBottom: 24 },
    Link: { textDecoration: 'none', color: '#fb6e8a' },
    WelcomeText: { fontSize: 30, fontWeight: 'bold', marginTop: 71, color: '#fff' },
    WelcomeInfo: { fontSize: 15, color: '#fff', marginTop: 14, padding: '0px 16px' },
    SignInBtn: { borderRadius: 50, borderColor: '#fff', padding: '10px 55px', fontSize: 13, color: '#fff', marginTop: 20 },
    ForgetPassText: { fontSize: 15, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"30px" },
    //footer css
    CopyrightText: { fontSize: 14, },
    AllLinks: { fontSize: 14, color: '#fb6e8a' },
    FooterLinks: { textDecoration: 'none', color: '#fb6e8a' },
    GodaddyImage: { width: 150, marginTop: 20 },
    AuthorizeImage: { width: 65 },
    FooterLinkAuthorize: { textDecoration: 'none', color: '#fb6e8a', fontSize: 11 },
})

const SignIn = (props) => {
        const {classes,inputs,errors,handleChange,onSignIn,agreement,handleCheckbox,loader}=props;

        return (
            <React.Fragment>
                <Grid container direction="row" justifyContent="center">
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <img
                            className={classes.Logo}
                            src={Logo}
                            alt='header-logo'
                        />
                        <Typography variant="subtitle2" className={classes.SignupText}>Sign In</Typography>
                        <Span mt={1.2} className={classes.AllPadding}>
                            <Grid container direction="row" justifyContent="center">
                                <Grid item xs={12} sm={12} md={12} lg={8}>
                                    <Span mt={3} />
                                    <FormControl fullWidth className={classes.inputWidth}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="text"
                                            variant="outlined"
                                            InputProps={{ classes: { input: classes.textField, }, }}
                                            InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
                                            value={inputs['email'] || ''}
                                            onChange={event => {
                                                handleChange(
                                                    event.target.name,
                                                    event.target.value
                                                );
                                            }}
                                        />
                                        {errors['email'] ? (
                                            <FormHelperText error>
                                                {errors['email']}
                                            </FormHelperText>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={8}>
                                    <Span mt={3} />
                                    <FormControl fullWidth className={classes.inputWidth}>
                                        <TextField
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            InputProps={{ classes: { input: classes.textField, }, }}
                                            InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
                                            value={inputs['password'] || ''}
                                            onChange={event => {
                                                handleChange(
                                                    event.target.name,
                                                    event.target.value
                                                );
                                            }}
                                        />
                                        {errors['password'] ? (
                                            <FormHelperText error>
                                                {errors['password']}
                                            </FormHelperText>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={9}>
                                    {/* <Typography variant="subtitle1" className={classes.ForgetPassText}>Forget Password</Typography> */}
                                    <Span display="flex" mt={6} >
                                        <div><Checkbox 
                                        name="checkedC" 
                                        color="default"
                                         classes={{ root: classes.CheckboxIcon }} 
                                         onChange={(e) => handleCheckbox(e)}
                                         /></div>
                                        <Typography variant="caption">
                                            I have read and agree to the 
                                            <a href="https://www.betwext.com/terms/"
                                             className={classes.Link}>
                                                 Terms Of Sercive
                                                 </a>
                                                 {!agreement && errors['agreement'] ? (
                                                <FormHelperText error>
                                                    {errors['agreement']}
                                                </FormHelperText>
                                            ) : null}
                                        </Typography>

                                    </Span>
                                    <Span display="flex" justifyContent="space-between" mt={3} >
                                        <Link to={`/auth/forgot-password`} style={{textDecoration:"none"}}>
                                        <Typography 
                                        variant="subtitle1" 
                                        className={classes.ForgetPassText}>
                                        Forget Password
                                        </Typography>
                                        </Link>
                                        <Button 
                                            variant="outlined" 
                                            size="large" 
                                            className={classes.SignUpBtn} 
                                            onClick={onSignIn}
                                            disabled={loader}>
                                            Sign In
                                        {loader && <CircularLoader/>}
                                        </Button>                                    
                                        </Span>
                                </Grid>
                            </Grid>
                        
                        </Span>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} className={classes.WelcomContainer} align="center">
                        <Typography variant="subtitle2" className={classes.WelcomeText}>Welcome Friend!</Typography>
                        <Typography variant="caption" className={classes.WelcomeInfo}>We are here to help you connect with your team and customers.</Typography>
                    </Grid>
                </Grid>
                {/* Footer */}
                <Span mb={1}><Divider /></Span>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} sm={4} md={4} lg={4} align="center">
                        <Typography variant='caption' className={classes.CopyrightText}>Copyright 2020. All rights reserved</Typography><br />
                        {/* <Typography variant='caption' className={classes.AllLinks}><a href="https://www.betwext.com/privacy/" className={classes.FooterLinks}>Privacy</a> | <a href="https://www.betwext.com/terms/" className={classes.FooterLinks}>Terms</a> | <a href="https://www.betwext.com/acceptuse" className={classes.FooterLinks}>Use</a> | <a href="#" className={classes.FooterLinks}>Support</a></Typography> */}
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} align="center">
                        <Typography variant='caption' className={classes.AllLinks}><a href="https://pro.betwext.com/auth/betwext_registration" className={classes.FooterLinks}>Powered by Betwext</a></Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} align="center">
                        <Span display="flex" justifyContent="center">
                            <a href="https://in.godaddy.com/">
                                <img
                                    className={classes.GodaddyImage}
                                    src={GoDaddyImage}
                                    alt='godaddy'
                                />
                            </a>
                            <Span align="center" display="grid">
                                <a href="https://www.authorize.net/">
                                    <img
                                        className={classes.AuthorizeImage}
                                        src={Authorize}
                                        alt='godaddy'
                                    />
                                </a>
                                <Typography variant='caption' className={classes.AllLinks}><a href="https://www.authorize.net/" className={classes.FooterLinkAuthorize}>Online Payments</a></Typography>
                            </Span>
                        </Span>
                    </Grid>
                </Grid>
                <Span mb={1.5} />
                {/* ...... */}
            </React.Fragment>
        );
}

export default withStyles(styles)(SignIn);




// import React, { Component } from 'react';
// import {
//     Grid, withStyles, FormControl, TextField, Typography,
//     MenuItem, Checkbox, Button, Divider
// } from '@material-ui/core';
// import Span from "@material-ui/core/Box";
// import Logo from "../../Assets/logo.png"
// import GoDaddyImage from "../../Assets/godaddy.png"
// import Authorize from "../../Assets/Authorize.png"

// const styles = (theme) => ({
//     Logo: { width: 97, marginTop: 14, marginLeft: 116 },
//     SignupText: { fontSize: 30, fontWeight: 'bold', marginLeft: 114, marginTop: 10 },
//     WelcomContainer: { background: '#fa6e89', height: '100vh' },
//     textField: { fontSize: 13, color: '#2b2b2b', padding: '12px 13px', background: '#fff' },
//     cssLabel: {
//         color: '#908f8f',
//         transform: "translate(14px, 13px) scale(1)",
//         fontSize: 13,
//     },
//     LableShrink: { fontSize: 14, transform: 'translate(17px, -4px) scale(0.75) !important' },

//     [theme.breakpoints.down('md')]: {
//         AllPadding: { padding: '0px 20px' },
//         Logo: { marginLeft: 20 },
//         SignupText: { marginLeft: 20, },
//         ForgetPassText: { fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"0px !important" },
//     },
//     [theme.breakpoints.only('sm')]: {
//         CheckboxIcon: { margin: '-10px 0px 0px -12px !important', },
//         ForgetPassText: { fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"0px !important" },

//     },
//     [theme.breakpoints.only('lg')]: {
//         inputWidth: { width: 470, marginLeft: 7 },
//         CheckboxIcon: { margin: '-12px 0px 0px 24px !important', },
//         ForgetPassText: { fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"30px" },

//     },
//     [theme.breakpoints.only('xs')]: {
//         WelcomContainer: { height: 305 },
//         CheckboxIcon: { margin: '-12px 0px 0px -9px !important' },
//         ForgetPassText: { fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"0px !important" },

//     },
//     SignUpBtn: { borderRadius: 50, borderColor: '#fb6e8a', padding: '10px 55px', fontSize: 13, color: '#fb6e8a', marginBottom: 24 },
//     Link: { textDecoration: 'none', color: '#fb6e8a' },
//     WelcomeText: { fontSize: 30, fontWeight: 'bold', marginTop: 71, color: '#fff' },
//     WelcomeInfo: { fontSize: 15, color: '#fff', marginTop: 14, padding: '0px 16px' },
//     SignInBtn: { borderRadius: 50, borderColor: '#fff', padding: '10px 55px', fontSize: 13, color: '#fff', marginTop: 20 },
//     ForgetPassText: { fontSize: 15, color: '#fb6e8a', cursor: 'pointer',marginTop:"12px", marginLeft:"30px" },
//     //footer css
//     CopyrightText: { fontSize: 14, },
//     AllLinks: { fontSize: 14, color: '#fb6e8a' },
//     FooterLinks: { textDecoration: 'none', color: '#fb6e8a' },
//     GodaddyImage: { width: 150, marginTop: 20 },
//     AuthorizeImage: { width: 65 },
//     FooterLinkAuthorize: { textDecoration: 'none', color: '#fb6e8a', fontSize: 11 },
// })

// class SignIn extends Component {
//     state = {}
//     render() {
//         const { classes } = this.props;
//         return (
//             <React.Fragment>
//                 <Grid container direction="row" justify="center">
//                     <Grid item xs={12} sm={6} md={6} lg={6}>
//                         <img
//                             className={classes.Logo}
//                             src={Logo}
//                             alt='header-logo'
//                         />
//                         <Typography variant="subtitle2" className={classes.SignupText}>Sign In</Typography>
//                         <Span mt={1.2} className={classes.AllPadding}>
//                             <Grid container direction="row" justify="center">
//                                 <Grid item xs={12} sm={12} md={12} lg={8}>
//                                     <Span mt={3} />
//                                     <FormControl fullWidth className={classes.inputWidth}>
//                                         <TextField
//                                             id="emial"
//                                             label="Email"
//                                             type="text"
//                                             variant="outlined"
//                                             InputProps={{ classes: { input: classes.textField, }, }}
//                                             InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={12} lg={8}>
//                                     <Span mt={3} />
//                                     <FormControl fullWidth className={classes.inputWidth}>
//                                         <TextField
//                                             id="password"
//                                             label="Password"
//                                             type="password"
//                                             variant="outlined"
//                                             InputProps={{ classes: { input: classes.textField, }, }}
//                                             InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={12} lg={9}>
//                                     {/* <Typography variant="subtitle1" className={classes.ForgetPassText}>Forget Password</Typography> */}
//                                     <Span display="flex" mt={6} >
//                                         <div><Checkbox name="checkedC" color="default" classes={{ root: classes.CheckboxIcon }} /></div>
//                                         <Typography variant="caption">
//                                             I have read and agree to the <a href="https://www.betwext.com/terms/" className={classes.Link}>Terms Of Sercive</a>
//                                         </Typography>

//                                     </Span>
//                                     <Span display="flex" justifyContent="space-between" mt={3} >
//                                         <Typography variant="subtitle1" className={classes.ForgetPassText}>Forget Password</Typography>
//                                         <Button variant="outlined" size="large" className={classes.SignUpBtn}>Sign In</Button>                                    
//                                         </Span>
//                                 </Grid>
//                             </Grid>
//                         </Span>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={6} lg={6} className={classes.WelcomContainer} align="center">
//                         <Typography variant="subtitle2" className={classes.WelcomeText}>Welcome Friend!</Typography>
//                         <Typography variant="caption" className={classes.WelcomeInfo}>We are here to help you connect with your team and customers.</Typography>
//                     </Grid>
//                 </Grid>
//                 {/* Footer */}
//                 <Span mb={1}><Divider /></Span>
//                 <Grid container direction="row" alignItems="center">
//                     <Grid item xs={12} sm={4} md={4} lg={4} align="center">
//                         <Typography variant='caption' className={classes.CopyrightText}>Copyright 2020. All rights reserved</Typography><br />
//                         <Typography variant='caption' className={classes.AllLinks}><a href="https://www.betwext.com/privacy/" className={classes.FooterLinks}>Privacy</a> | <a href="https://www.betwext.com/terms/" className={classes.FooterLinks}>Terms</a> | <a href="https://www.betwext.com/acceptuse" className={classes.FooterLinks}>Use</a> | <a href="#" className={classes.FooterLinks}>Support</a></Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={4} md={4} lg={4} align="center">
//                         <Typography variant='caption' className={classes.AllLinks}><a href="https://pro.betwext.com/auth/betwext_registration" className={classes.FooterLinks}>Powered by Betwext</a></Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={4} md={4} lg={4} align="center">
//                         <Span display="flex" justifyContent="center">
//                             <a href="https://in.godaddy.com/">
//                                 <img
//                                     className={classes.GodaddyImage}
//                                     src={GoDaddyImage}
//                                     alt='godaddy'
//                                 />
//                             </a>
//                             <Span align="center" display="grid">
//                                 <a href="https://www.authorize.net/">
//                                     <img
//                                         className={classes.AuthorizeImage}
//                                         src={Authorize}
//                                         alt='godaddy'
//                                     />
//                                 </a>
//                                 <Typography variant='caption' className={classes.AllLinks}><a href="https://www.authorize.net/" className={classes.FooterLinkAuthorize}>Online Payments</a></Typography>
//                             </Span>
//                         </Span>
//                     </Grid>
//                 </Grid>
//                 <Span mb={1.5} />
//                 {/* ...... */}
//             </React.Fragment>
//         );
//     }
// }

// export default withStyles(styles)(SignIn);