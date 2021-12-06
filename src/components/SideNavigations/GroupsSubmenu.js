import React from 'react'
import { Drawer, withStyles, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const styles = (theme) => ({
    drawerPaper:{marginTop:62, background:'#f5f1f1', width:262, boxShadow:'none', borderRight:'none', marginLeft:70},
    ListItemPadding:{paddingLeft:17, paddingRight:13},
    ListAvatar:{background:'#fb6e8a', color:'#fff', fontSize:14, width:30, height:30},
    ListIconContainer:{minWidth:36},
    ListTitle:{fontSize:14},
    DrawerModel:{position:'relative !important', zIndex:'1200 !important'},
    [theme.breakpoints.only('xs')]: {
        DrawerModel:{position:'relative !important', zIndex:'1300 !important'},
    },
})

const GruopSubmenu = (props) => {
    const {classes, openState, closeSubNavigation} = props;
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
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/contacts/create-public-group"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <Avatar classes={{root:classes.ListAvatar}}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Create New Group" />
                    </ListItem>
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/contacts/create-sync-group"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <Avatar classes={{root:classes.ListAvatar}}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Create New Sync Group" />
                    </ListItem>
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/contacts/manage-sync-groups"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <Avatar classes={{root:classes.ListAvatar}}>
                                <FontAwesomeIcon icon={faSyncAlt} />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Manage Sync Groups" />
                    </ListItem>
                    <ListItem 
                        button 
                        className={classes.SublistContainerPadding}
                        component={NavLink}
                        to="/contacts/manage-public-groups"
                        onClick={()=>{closeSubNavigation()}}
                    >
                        <ListItemIcon classes={{root:classes.ListIconContainer}}>
                            <Avatar classes={{root:classes.ListAvatar}}>
                                <FontAwesomeIcon icon={faSyncAlt} />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText classes={{primary:classes.ListTitle}} primary="Manage Groups" />
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    )
}

export default withStyles(styles)(GruopSubmenu);
