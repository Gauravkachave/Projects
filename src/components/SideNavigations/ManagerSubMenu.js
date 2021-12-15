import React from 'react'
import { Drawer, withStyles, List, ListItem, ListItemIcon, ListItemText,Collapse, Avatar } from '@material-ui/core';
import { faLongArrowAltRight, faUsers, faFillDrip, faBirthdayCake, faUserCog} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const styles = (theme) => ({
    drawerPaper:{marginTop:62, background:'#f5f1f1', width:262, boxShadow:'none', borderRight:'none', marginLeft:70},
    ListItemPadding:{paddingLeft:17, paddingRight:13},
    ListAvatar:{background:'#fb6e8a', color:'#fff', fontSize:14, width:30, height:30},
    ListIconContainer:{minWidth:36},
    ListTitle:{fontSize:14},
    ListSubmenuIconArrow:{minWidth:19, marginLeft:37},
    SublistTitles:{fontSize:13},
    SublistContainerPadding:{paddingTop:4, paddingBottom:4},
    DrawerModel:{position:'relative !important', zIndex:'1200 !important'},
    [theme.breakpoints.only('xs')]: {
        DrawerModel:{position:'relative !important', zIndex:'1300 !important'},
    },
})

const ManagerSubmenu = (props) => {
    const {classes, openState, closeSubNavigation} = props;
    const [manageTemplate, setManageTemplate] = React.useState(false);
    const handlemanageTemplate = () =>{setManageTemplate(!manageTemplate)}
    return (
        <React.Fragment>
            <Drawer
                variant="temporary"
                anchor="left"
                open={openState}
                onClose={closeSubNavigation}
                classes={{paperAnchorLeft:classes.drawerPaper, modal:classes.DrawerModel}}
                BackdropProps={{style : {top:'62px', left:70}}}
            >
                <List component="nav" disablePadding>
                <ListItem button onClick={handlemanageTemplate} classes={{gutters:classes.ListItemPadding}}>
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <Avatar classes={{root:classes.ListAvatar}}>
                                <FontAwesomeIcon icon={faUsers} />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Manage Templates" />
                        {manageTemplate ? <ArrowDropDownIcon /> : < ArrowRightIcon/>}
                    </ListItem>
                    <Collapse in={manageTemplate} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/manager/manage-normal-template"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <ListItemIcon classes={{root:classes.ListSubmenuIconArrow}}><FontAwesomeIcon icon={faLongArrowAltRight} /></ListItemIcon>                           
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Manage Templates" />
                    </ListItem>
                    </List>
                    </Collapse>
                    <Collapse in={manageTemplate} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/manager/add-private-template"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <ListItemIcon classes={{root:classes.ListSubmenuIconArrow}}><FontAwesomeIcon icon={faLongArrowAltRight} /></ListItemIcon>                           
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Add Template" />
                    </ListItem>
                    </List>
                    </Collapse>

                    <Collapse in={manageTemplate} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/manager/manage-normal-category"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <ListItemIcon classes={{root:classes.ListSubmenuIconArrow}}><FontAwesomeIcon icon={faLongArrowAltRight} /></ListItemIcon>                           
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Manage Categories" />
                    </ListItem>
                    </List>
                    </Collapse>

                    <Collapse in={manageTemplate} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/manager/manage-normal-folder"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <ListItemIcon classes={{root:classes.ListSubmenuIconArrow}}><FontAwesomeIcon icon={faLongArrowAltRight} /></ListItemIcon>                           
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Manage Folder" />
                    </ListItem>
                    </List>
                    </Collapse>

                    <Collapse in={manageTemplate} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/manager/edit-normal-template"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        {/* <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <ListItemIcon classes={{root:classes.ListSubmenuIconArrow}}><FontAwesomeIcon icon={faLongArrowAltRight} /></ListItemIcon>                           
                        </ListItemIcon> */}
                        {/* <ListItemText classes={{primary:classes.ListTitle}} primary="Manage Folder" /> */}
                    </ListItem>
                    </List>
                    </Collapse>

                </List>
            </Drawer>
        </React.Fragment>
    )
}

export default withStyles(styles)(ManagerSubmenu);
