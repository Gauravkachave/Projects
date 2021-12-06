import React from 'react';
import {
    Grid, withStyles, FormControl, TextField, Typography,
    MenuItem, Checkbox, Button, FormHelperText
} from '@material-ui/core';
import Span from '@material-ui/core/Box';
import Logo from '../../Assets/logo.png';
import CircularLoader from '../../helper/loaders/CircularLoader';
import { Regex_Validator } from '../../helper/constants';

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
    },
    [theme.breakpoints.only('lg')]: {
        inputWidth: { width: 470, marginLeft: 7 },
        CheckboxIcon:{margin:'-10px 0px 0px 24px !important',},
    },
    [theme.breakpoints.only('xs')]: {
        WelcomContainer: { height: 305 },
        CheckboxIcon:{margin:'-7px 0px 0px 0px !important'}
    },
    [theme.breakpoints.only('sm')]:{
        CheckboxIcon:{margin:'-10px 0px 0px -12px !important',},
    },
    //CheckboxIcon: { padding: '0px 8px 13px 0px' },
    SignUpBtn: { borderRadius: 50, borderColor: '#fb6e8a', padding: '10px 55px', fontSize: 13, color: '#fb6e8a', marginBottom: 24 },
    Link: { textDecoration: 'none', color: '#fb6e8a' },
    WelcomeText: { fontSize: 30, fontWeight: 'bold', marginTop: 71, color: '#fff' },
    WelcomeInfo: { fontSize: 15, color: '#fff', marginTop: 14, padding: '0px 16px' },
    SignInBtn: { borderRadius: 50, borderColor: '#fff', padding: '10px 55px', fontSize: 13, color: '#fff', marginTop: 20 },
    buttonProgress: { color: '#ff4569', position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12 },
})

const Signup = (props) => {
    const { classes, subscriptionList, handleChange, subscription, errors, 
        onSignUp, handleCheckbox, agreement, inputs, loaderBtn
    } = props;

    return (
        <React.Fragment>
            <Grid container direction="row" justify="center">
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <img
                        className={classes.Logo}
                        src={Logo}
                        alt='header-logo'
                    />
                    <Typography variant="subtitle2" className={classes.SignupText}>Sign Up</Typography>
                    <Span mt={1.2} className={classes.AllPadding}>
                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <FormControl fullWidth className={classes.inputWidth}>
                                    <TextField
                                        id="first_name"
                                        label="First Name"
                                        type="text"
                                        name="first_name"
                                        value={inputs['first_name'] || ''}
                                        variant="outlined"
                                        InputProps={{ classes: { input: classes.textField, }, }}
                                        InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
                                        onChange={event => {
                                            handleChange(
                                                event.target.name,
                                                event.target.value
                                            );
                                        }}
                                    />
                                    {errors['first_name'] ? (
                                        <FormHelperText error>
                                            {errors['first_name']}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <Span mt={3} />
                                <FormControl fullWidth className={classes.inputWidth}>
                                    <TextField
                                        id="last_name"
                                        label="Last Name"
                                        type="text"
                                        name="last_name"
                                        value={inputs['last_name'] || ''}
                                        variant="outlined"
                                        InputProps={{ classes: { input: classes.textField, }, }}
                                        InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
                                        onChange={event => {
                                            handleChange(
                                                event.target.name,
                                                event.target.value
                                            );
                                        }}
                                    />
                                    {errors['last_name'] ? (
                                        <FormHelperText error>
                                            {errors['last_name']}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <Span mt={3} />
                                <FormControl fullWidth className={classes.inputWidth}>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        type="text"
                                        name="email"
                                        value={inputs['email'] || ''}
                                        variant="outlined"
                                        InputProps={{ classes: { input: classes.textField, }, }}
                                        InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
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
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={inputs['password'] || ''}
                                        variant="outlined"
                                        InputProps={{ classes: { input: classes.textField, }, }}
                                        InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
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
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <Span mt={3} />
                                <FormControl fullWidth className={classes.inputWidth}>
                                    <TextField
                                        id="phone_number"
                                        label="Phone Number"
                                        type="text"
                                        name="phone_number"
                                        value={inputs['phone_number'] || ''}
                                        variant="outlined"
                                        InputProps={{ classes: { input: classes.textField, }, }}
                                        InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
                                        onChange={event => {
                                            handleChange(
                                                event.target.name,
                                                event.target.value.replace(Regex_Validator.NotNumber,'')
                                            );
                                        }}
                                    />
                                    {errors['phone_number'] ? (
                                        <FormHelperText error>
                                            {errors['phone_number']}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <Span mt={3} />
                                <FormControl fullWidth className={classes.inputWidth}>
                                    <TextField
                                        select
                                        id='plan_id'
                                        name="plan_id"
                                        value={subscription && subscription.plan_id}
                                        variant="outlined"
                                        InputProps={{ classes: { input: classes.textField, }, }}
                                        onChange={event => {
                                            handleChange(
                                                event.target.name,
                                                event.target.value
                                            );
                                        }}
                                    >
                                        <MenuItem value={0}>Select Subscription</MenuItem>
                                        {subscriptionList && subscriptionList.map(option => (
                                            <MenuItem key={option.plan_id} value={option.plan_id}>
                                                {option.plan_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {errors['plan_id'] ? (
                                        <FormHelperText error>
                                            {errors['plan_id']}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={9}>
                                <Span mt={3} />
                                <Span display="flex">
                                    <div>
                                    <Checkbox
                                        color="default"
                                        name="checkedC"
                                        checked={agreement}
                                        classes={{ root: classes.CheckboxIcon }}
                                        onChange={(e) => handleCheckbox(e)}
                                    />
                                    </div>
                                    <Typography variant="caption">
                                        By clicking get immediate access. I agree to all PinkTel <a href="http://www.betwext.com/terms/" className={classes.Link}>terms of service</a> and <a href="http://www.betwext.com/privacy/" className={classes.Link}>acceptable use </a>
                                        policies.
                                        {!agreement && errors['agreement'] ? (
                                        <FormHelperText error>
                                            {errors['agreement']}
                                        </FormHelperText>
                                    ) : null}
                                    </Typography>
                                </Span>
                                
                                <Span align="right" mt={3}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        className={classes.SignUpBtn}
                                        onClick={(e) => onSignUp(e)}
                                        disabled={loaderBtn}
                                    >
                                        Sign Up
                                        {loaderBtn && <CircularLoader/>}
                                    </Button>
                                </Span>
                            </Grid>
                        </Grid>
                    </Span>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.WelcomContainer} align="center">
                    <Typography variant="subtitle2" className={classes.WelcomeText}>Welcome Friend!</Typography>
                    <Typography variant="caption" className={classes.WelcomeInfo}>We are here to help you connect with your team and customers.</Typography>
                    <Span>
                        <Button variant="outlined" size="large" className={classes.SignInBtn}>Sign In</Button>
                    </Span>
                </Grid>
            </Grid>
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default withStyles(styles)(Signup);
