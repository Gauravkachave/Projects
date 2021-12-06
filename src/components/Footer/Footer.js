import React from 'react';
import { Grid, withStyles, Typography, Divider } from '@material-ui/core';
import GoDaddyImage from '../../Assets/godaddy.png';
import Authorize from '../../Assets/Authorize.png';
import Span from '@material-ui/core/Box';

const styles = (theme) =>({
    //footer css
    CopyrightText:{fontSize:14,},
    AllLinks:{fontSize:14, color:'#fb6e8a'},
    FooterLinks:{textDecoration:'none',color:'#fb6e8a' },
    GodaddyImage:{width:150, marginTop:20},
    AuthorizeImage:{width:65},
    FooterLinkAuthorize:{textDecoration:'none',color:'#fb6e8a', fontSize:11}
});

const Footer = (props) => {
    const { classes } = props;
    const currentTime = new Date();
    const theYear = currentTime.getFullYear();
    return (
        <React.Fragment>
            {/* Footer */}
            <Span mb={1} mt={3}><Divider/></Span>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} sm={4} md={4} lg={4} align="center">
                        <Typography variant='caption' className={classes.CopyrightText}>
                            Copyright {theYear}. All rights reserved
                        </Typography><br/>
                        <Typography variant='caption' className={classes.AllLinks}><a href="https://www.betwext.com/privacy/" className={classes.FooterLinks}>Privacy</a> | <a href="https://www.betwext.com/terms/" className={classes.FooterLinks}>Terms</a> | <a href="https://www.betwext.com/acceptuse" className={classes.FooterLinks}>Use</a> | <a href="#support" className={classes.FooterLinks}>Support</a></Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} align="center">
                        <Typography variant='caption'className={classes.AllLinks}><a href="https://pro.betwext.com/auth/betwext_registration" className={classes.FooterLinks}>Powered by Betwext</a></Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} align="center">
                        <Span display="flex" justifyContent="center">
                            <a href="https://in.godaddy.com/">
                                <img
                                    className={classes.GodaddyImage}
                                    src={GoDaddyImage}
                                    alt='Godaddy' 
                                />
                            </a>
                            <Span align="center" display="grid">
                                <a href="https://www.authorize.net/">
                                    <img
                                        className={classes.AuthorizeImage}
                                        src={Authorize}
                                        alt='Authorize.net' 
                                    />
                                </a>
                                <Typography variant='caption' className={classes.AllLinks}><a href="https://www.authorize.net/"className={classes.FooterLinkAuthorize}>Online Payments</a></Typography>
                            </Span>
                        </Span>
                    </Grid>
                </Grid>
                <Span mb={1.5}/>
                {/* ...... */}
        </React.Fragment>
    )
}

export default withStyles(styles)(Footer);
