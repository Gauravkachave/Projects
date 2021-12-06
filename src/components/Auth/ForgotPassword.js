import {
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
  Checkbox,
  withStyles,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import Span from "@material-ui/core/Box";
import Logo from "../../Assets/logo.png";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = (theme) => ({
  Logo: { width: 97, marginTop: 14, marginLeft: 119 },
  SignupText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 119,
    marginTop: 10,
  },
  WelcomContainer: { background: "#fa6e89", height: "100vh" },
  textField: {
    fontSize: 13,
    color: "#2b2b2b",
    padding: "12px 13px",
    background: "#fff",
  },
  cssLabel: {
    color: "#908f8f",
    transform: "translate(14px, 13px) scale(1)",
    fontSize: 13,
  },
  EmailIconCss: { fontSize: 25, cursor: "pointer" },
  LableShrink: {
    fontSize: 14,
    transform: "translate(17px, -4px) scale(0.75) !important",
  },
  CancelBtn: {
    fontSize: 11,
    boxShadow: "none",
    padding: "8px 15px",
    margin: "0px 4px",
    color: "#fb6e89",
    borderColor: "#fb6e89",
    "&:hover": { boxShadow: "none" },
  },
  HelperText: { fontSize: 12 },
  EmailText: { marginLeft: "119px", marginTop: 16 },
  SendBtn: {
    fontSize: 11,
    boxShadow: "none",
    lineHeight: "21px",
    padding: "8px 20px",
    background: "#fb6e8a",
    color: "#fff",
    "&:hover": { background: "#fb6e8a", boxShadow: "none" },
  },
  inputHeading: { color: "#585757", fontSize: 13 },
  WelcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 71,
    color: "#fff",
  },
  WelcomeInfo: {
    fontSize: 15,
    color: "#fff",
    marginTop: 14,
    padding: "0px 16px",
  },

  [theme.breakpoints.down("md")]: {
    AllPadding: { padding: "0px 20px" },
    Logo: { marginLeft: 20 },
    SignupText: { marginLeft: 20 },
    EmailText: { marginLeft: "21px" },
  },

  [theme.breakpoints.only("sm")]: {
    ResponsiveView: { margin: "16px 0px" },
  },
  // [theme.breakpoints.only('lg')]: {
  //     inputWidth: { width: 470, marginLeft: 7 },
  // },
  [theme.breakpoints.only("xs")]: {
    WelcomContainer: { height: 305 },
    ResponsiveView: { margin: "16px 0px" },
  },
});
const ForgotPassword = (props) => {
  const { classes,handleChange,inputs,errors,handleClick,handleCancleClick} = props;
  return (
    <div>
      <Grid container direction="row" justify="center">
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <img className={classes.Logo} src={Logo} alt="header-logo" />
          <Typography variant="subtitle2" className={classes.SignupText}>
            Forgot Password
          </Typography>
          <Span className={classes.EmailText}>
            <Typography className={classes.inputHeading} variant="subtitle2">
              Enter the Email address associated with your account and we'll
              send a <br />
              link to reset your password
            </Typography>
          </Span>
          <Span mt={1.2} className={classes.AllPadding}>
            <Grid container direction="row" justify="center">
              <Grid item xs={12} sm={12} md={12} lg={8}>
                <Span mt={3} />
                <FormControl fullWidth className={classes.inputWidth}>
                  <TextField
                    id="email"
                    label="Email"
                    name="email"
                    type="text"
                    value={inputs['email'] || ''}
                    onChange={event => {
                        handleChange(
                            event.target.name,
                            event.target.value
                        );
                    }}
                    size="small"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.textField } }}
                    InputLabelProps={{
                      classes: {
                        outlined: classes.cssLabel,
                        shrink: classes.LableShrink,
                      },
                    }}
                    
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon className={classes.EmailIconCss} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors['email'] ? <FormHelperText error className={classes.HelperText}>{errors['email']}</FormHelperText>: ''}

                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} align="right">
                <Span mt={4} className={classes.ResponsiveView}>
                  <div>
                    <Button variant="outlined" className={classes.CancelBtn} onClick={handleCancleClick}>
                      Cancel
                    </Button>
                    <Button variant="contained" className={classes.SendBtn} onClick={handleClick}>
                      Send Reset Instruction
                    </Button>
                  </div>
                </Span>
              </Grid>
            </Grid>
          </Span>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          className={classes.WelcomContainer}
          align="center"
        >
          <Typography variant="subtitle2" className={classes.WelcomeText}>
            Welcome Friend!
          </Typography>
          <Typography variant="caption" className={classes.WelcomeInfo}>
            We are here to help you connect with your team and customers.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ForgotPassword);
