import React,{useState,useContext} from 'react'
import { Typography, withStyles, AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, 
Hidden, Drawer, List, ListItem, ListItemIcon, ListItemText, Popover, ListItemAvatar, Avatar, Divider, Button
} from '@material-ui/core';
import Span  from "@material-ui/core/Box";
import TelegramIcon from '@material-ui/icons/Telegram';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools, faUsers, faAddressBook,faPaperPlane, faChartLine, faShieldAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Logo from "../../Assets/logo.png"
import { UserAccountContext } from '../../contextHooks';
import {userLogout} from '../../helper/commonFunction';
import { withRouter } from 'react-router';

const styles = (theme) => ({
    Logo:{width:97},
    AppbarCss:{boxShadow:'none',background:'#fff', height:62, borderTop:'3px solid #fb6e8a',borderBottom:'1px solid #dadada'},
    ToolBarHeight:{minHeight:52},
    HeaderItems:{color:'#3d3d3d',fontWeight:500},
    HeaderEmail:{color:'#3d3d3d',fontWeight:500,marginRight:"20px"},
    ItemContainer:{padding:0, borderRadius:0, background:'transparent', margin:'0px 5px', color:'#2b2b2b','&:hover':{background:'transparent'}},
    HeaderIcons:{fontSize:33},
    HeaderItemText:{fontSize:11, lineHeight:'0.60rem', color:'#000'},
    BadgeCss:{transform:'initial', minWidth:10, height:10, marginRight:4, marginTop:10, background:'#fb6e8a', padding:'0px 0px'},
    ProfileDropdown:{marginTop:18, width:300, outline:'none', padding:'12px 6px'},
    MenuButton:{padding:0},
    drawerPaper:{marginTop:62, background:'#fb6e8a', boxShadow:'none', width:70, borderRight:'none',},
    ListItemCss:{display:'block', textAlign:'center', paddingTop:10, paddingBottom:3},
    ListContainer:{textAlign:'center'},
    ListItemIconCss:{minWidth:0, fontSize:30, color:'#fff'},
    ListItemTextCss:{color:'#fff', fontSize:11},
    ListItemTextToolsCss:{color:'#fff', fontSize:11,marginTop:6},
    HeaderIconIM:{fontSize:26, marginTop:4, marginBottom:2},
    AlertDropdown:{padding:'10px 10px',  width:210,  top:'63px !important'},
    UserCircleIcon:{fontSize:65,},

    UserDetails:{fontSize:15, marginTop:3, wordBreak:'break-all'},
    UserBtns:{fontSize:12, border:'1px solid #fb6e8a', color:'#fb6e8a', margin:'0px 4px', padding:'5px 7px', '&:hover':{background:'none'}},
    UserBtnIcons:{fontSize:21, marginRight:2}
})

const Navbar = (props) => {
    // const userAccount=useContext(UserAccountContext);
    // console.log(userAccount);
    const { classes,prps} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // notification alert
    const [anchorElAlert, setAnchorElAlert] = React.useState(null);
    const openAlert = Boolean(anchorElAlert);

    const handleClickAlert = (event) => {
        setAnchorElAlert(event.currentTarget);
      };
   
      const handleCloseAlert = () => {
        setAnchorElAlert(null);
      };
      
      const onClickLogoutHandler = () => {
        userLogout(props);
      }
    return (
        <React.Fragment>
            <AppBar position='fixed' classes={{root:classes.AppbarCss}}>
                <Toolbar className={classes.ToolBarHeight}>
                    <Hidden only={['sm','xl','md','lg']}>
                        <IconButton className={classes.MenuButton} disableRipple onClick={handleExpandClick} >
                            <Span align="center" display="grid" justifyItems='center'>
                                {(expanded) ? <CloseIcon classes={{root:classes.HeaderIcons}} /> : <MenuIcon classes={{root:classes.HeaderIcons}} /> }
                            </Span>
                        </IconButton>
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={expanded}
                            onClose={handleExpandClick}
                            classes={{paperAnchorLeft:classes.drawerPaper }}
                            ModalProps={{ 
                                BackdropProps : { invisible : true}
                            }}
                        >
                            <List component='div' disablePadding>
                                <ListItem button disableGutters classes={{button:classes.ListItemCss}}>
                                    <ListItemIcon classes={{root:classes.ListItemIconCss}}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary:classes.ListItemTextCss}} primary='Campaigns'/>
                                </ListItem>
                                <ListItem button disableGutters classes={{button:classes.ListItemCss}}>
                                    <ListItemIcon classes={{root:classes.ListItemIconCss}}>
                                        <FontAwesomeIcon icon={faUsers} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary:classes.ListItemTextCss}} primary='Groups'/>
                                </ListItem>
                                <ListItem button disableGutters classes={{button:classes.ListItemCss}}>
                                    <ListItemIcon classes={{root:classes.ListItemIconCss}}>
                                        <FontAwesomeIcon icon={faAddressBook} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary:classes.ListItemTextCss}} primary='Contacts'/>
                                </ListItem>
                                <ListItem button disableGutters classes={{button:classes.ListItemCss}}>
                                    <ListItemIcon classes={{root:classes.ListItemIconCss}}>
                                        <FontAwesomeIcon icon={faChartLine} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary:classes.ListItemTextCss}} primary='Activity'/>
                                </ListItem>
                                <ListItem button disableGutters classes={{button:classes.ListItemCss}}>
                                    <ListItemIcon classes={{root:classes.ListItemIconCss}}>
                                        <FontAwesomeIcon icon={faTools} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary:classes.ListItemTextToolsCss}} primary='Tools'/>
                                </ListItem>
                                <ListItem button disableGutters classes={{button:classes.ListItemCss}}>
                                    <ListItemIcon classes={{root:classes.ListItemIconCss}}>
                                        <FontAwesomeIcon icon={faShieldAlt} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary:classes.ListItemTextCss}} primary='Advance'/>
                                </ListItem>
                            </List>
                        </Drawer>
                    </Hidden>
                    <Span flexGrow={1} mt={1}>
                        <img className={classes.Logo} src={Logo} alt='header-logo'/>
                    </Span>
                    <Typography color="primary" variant="body2" className={classes.HeaderEmail}>pinksuccess@pinksuccess.net</Typography>
                    <IconButton className={classes.ItemContainer} disableRipple>
                        <Span align="center" display="grid" justifyItems='center'>
                            <ChatBubbleIcon classes={{root:classes.HeaderIconIM}} />
                            <Typography variant="caption" className={classes.HeaderItemText}>IM Messages</Typography>
                        </Span>
                    </IconButton>
                    <IconButton className={classes.ItemContainer} disableRipple>
                        <Span align="center" display="grid" justifyItems='center'>
                            <TelegramIcon fontSize='small' classes={{root:classes.HeaderIcons}} />
                            <Typography variant="caption" className={classes.HeaderItemText}>Campaigns</Typography>
                        </Span>
                    </IconButton>
                    <div>
                        <Popover
                            open={openAlert}
                            anchorEl={anchorElAlert}
                            onClose={handleCloseAlert}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            classes={{paper:classes.AlertDropdown}}
                        >
                            <List>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary='mark has schedule campaign.'
                                        secondary={
                                            <div>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    10:46 PM Feb 23 2021
                                                </Typography>
                                            </div>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Popover>
                    </div>
                    <div>
                        <IconButton className={classes.ItemContainer} disableRipple aria-haspopup="true"  onClick={handleMenu}>
                            <AccountCircle classes={{root:classes.HeaderIcons}} />
                        </IconButton>
                        <Popover
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            open={open}
                            onClose={handleClose}
                            classes={{paper:classes.ProfileDropdown}}
                        >
                            <Span align='center'>
                                <FontAwesomeIcon icon={faUserCircle} className={classes.UserCircleIcon}/>
                                <Typography variant='subtitle2' className={classes.UserDetails}>Gaurav</Typography>
                                <Typography variant='subtitle2' className={classes.UserDetails}>+1(417)-276-3979</Typography>
                                <Typography variant='subtitle2' className={classes.UserDetails}>gaurav@gmail.com</Typography>
                                <Span mt={1} mb={1}><Divider/></Span>
                                <Typography variant='subtitle2' className={classes.UserDetails}>Anytime Credits : 0</Typography>
                                <Typography variant='subtitle2' className={classes.UserDetails}>Monthly Credits : 0</Typography>
                                <Span mt={1}><Divider/></Span>
                                <Span mt={2}>
                                    <Button size='small' className={classes.UserBtns}>
                                        <HeadsetMicIcon className={classes.UserBtnIcons}/>    
                                        Support
                                    </Button>
                                    <Button size='small' 
                                    className={classes.UserBtns}
                                    onClick={onClickLogoutHandler}
                                    //  onClick={()=>{userLogout(prps)}}
                                     >
                                        <ExitToAppIcon className={classes.UserBtnIcons}/>    
                                        Logout
                                    </Button>
                                </Span>
                            </Span>
                        </Popover>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}


export default withStyles(styles)(withRouter(Navbar));