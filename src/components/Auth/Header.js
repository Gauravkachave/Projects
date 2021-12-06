import React from 'react';
import { Typography, AppBar, Toolbar, IconButton, withStyles, Menu, MenuItem } from '@material-ui/core';
import Span from "@material-ui/core/Box";
import Logo from "../../Assets/logo.png";
import { userLogout } from '../../helper/commonFunction';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';

const styles = (theme) => ({
    Logo: { width: 97, paddingLeft: 110 },
    AppbarCss: { boxShadow: 'none', background: '#fff', height: 62, borderTop: '3px solid #fb6e8a', borderBottom: '1px solid #dadada' },
    HeaderItems: { color: '#3d3d3d', fontWeight: 500, fontSize:13},
    AccDropdownIcon: { padding: 0, color: '#3d3d3d', marginTop: -2, marginRight: 110 },
    ProfileDropdown:{marginTop:30},
    supportLink:{textDecoration:'none', color:'#3d3d3d'},
    [theme.breakpoints.only('xs')]: {
        Logo: { width: 97, paddingLeft: '0px !important' },
        AccDropdownIcon: { marginRight: '0px !important' },
    },
    [theme.breakpoints.only('sm')]: {
        Logo: { paddingLeft: '0px !important' },
        AccDropdownIcon: { marginRight: '0px !important' },
    }

});

const Header = (props) => {
    const { classes, prps} = props;
   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    

    return (
        <AppBar position="static" classes={{ root: classes.AppbarCss }}>
            <Toolbar>
                <Span flexGrow={1}>
                    <img className={classes.Logo} src={Logo} alt='header-logo' />
                </Span>
                <Typography variant="caption" className={classes.HeaderItems}>Account
                    <IconButton 
                        classes={{ root: classes.AccDropdownIcon }}
                        onClick={()=>{userLogout(prps)}}
                        onClick={handleMenu}
                    >
                        {(anchorEl) ? <ArrowDropUpOutlinedIcon/>: <ArrowDropDownOutlinedIcon/> }
                    </IconButton>
                </Typography>
                <div>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                        classes={{paper:classes.ProfileDropdown}}
                    >
                        <MenuItem onClick={()=>{userLogout(prps)}}>
                           
                           <Typography variant="caption">Logout</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Typography variant="caption">
                                <a 
                                    className={classes.supportLink} 
                                    href="https://betwext.helpscoutdocs.com/" 
                                    rel="noreferrer"
                                    target="_blank">
                                    Support
                                </a>
                            </Typography>
                        
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(Header);