import React,{useState} from "react";
import {
  withStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Hidden,
  Icon,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faUsers,
  faAddressBook,
  faPaperPlane,
  faChartLine,
  faShieldAlt,
  faFileAlt,
  faCommentAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import GroupSubMenu from './GroupsSubmenu';            
import ManagerSubMenu from './ManagerSubMenu';

const styles = () => ({
  drawer: {
    background: "#fb6e8a",
    width: 70,
    borderRight: "none",
    marginTop: 62,
  },
  ListItemCss: { display: 'block', textAlign: 'center', paddingTop: 10, paddingBottom: 3 },
  ListItemCssActive: { display: 'block', textAlign: 'center', paddingTop: 10, paddingBottom: 3, background:'#fff', borderLeft:'3px solid #fb6e8a', '&:hover':{background:'#fff'}},
  ListContainer: { textAlign: 'center' },
  ListItemIconCss: { minWidth: 0, fontSize: 30, color: '#fff' },
  ListItemTextCss: { color: '#fff', fontSize: 11 },
  ListItemTextToolsCss: { color: '#fff', fontSize: 11, marginTop: 6 },
  ListItemIconCssActive:{color:'#fb6e8a', minWidth: 0, fontSize: 30},
  ListItemTextCssActive:{ color: '#fb6e8a', fontSize: 11 },
  ListItemCssClicked: { display: 'block', textAlign: 'center', paddingTop: 10, paddingBottom: 3, background:'#f5f1f1', borderLeft:'3px solid #fb6e8a', '&:hover':{background:'#f5f1f1'}},
  ImMsgIcon:{fontSize:33},
  ListItemTextCssIM:{color:'#fff', fontSize:11, margin:'0px 2px'},
});


const SideNavigationsMenu = (props) => {
  const groupsItems = ['create-public-group', 'create-sync-group', 'manage-public-groups', 'manage-sync-groups'];    
  const managerItems =['manage-normal-template', 'add-private-template', 'manage-normal-category', 'manage-normal-folder','add-normal-category'];

  const [subNavSelected,setSubNavSelected] = useState(null);
    const [clickedItem, setClickedItem] = useState(null);

    const openSubNavigation = (subNavItem) =>{
        setSubNavSelected(subNavItem);
        setClickedItem(subNavItem);
    }
    const closesSubNavgation = () =>{
        setSubNavSelected(null);
        setClickedItem(null);
    }



    const { classes, pageUri } = props;
    let pageSplit = pageUri.split('/');
    let rootPage = pageSplit[1];

    let groupPageIndex = groupsItems.indexOf(pageSplit[2]);
    let managerPageIndex = managerItems.indexOf(pageSplit[2]);
    

  const SideBarListItems = (
    <div className={classes.ListContainer}>
      <List component="div" disablePadding>
        <ListItem
          button
          disableGutters
          classes={{ button: classes.ListItemCss }}
        >
          <ListItemIcon classes={{ root: classes.ListItemIconCss }}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.ListItemTextCss }}
            primary="Campaigns"
          />
        </ListItem>





                <ListItem 
                    button disableGutters 
                    className={
                        (clickedItem === 'group') ? classes.ListItemCssClicked :
                        (rootPage === 'contacts' && groupPageIndex >= 0) 
                        ? classes.ListItemCssActive
                        : classes.ListItemCss
                    }
                    onClick={()=>{openSubNavigation('group')}}
                >
                    <ListItemIcon 
                        className={
                            ((rootPage === 'contacts' && groupPageIndex >= 0) || (clickedItem === 'group')) 
                            ? classes.ListItemIconCssActive
                            : classes.ListItemIconCss
                        }
                    >
                        <FontAwesomeIcon icon={faUsers} />
                    </ListItemIcon>
                    <ListItemText 
                        classes={
                            ((rootPage === 'contacts' && groupPageIndex >= 0) || (clickedItem === 'group')) 
                            ? {primary: classes.ListItemTextCssActive} 
                            : {primary: classes.ListItemTextCss}
                        }
                        primary='Groups' 
                    />
                </ListItem>
                <GroupSubMenu 
                    openState = {(subNavSelected === 'group') ? true : false}
                    closeSubNavigation = {()=>{closesSubNavgation()}}
                />


        <ListItem
          button
          disableGutters
          classes={{ button: classes.ListItemCss }}
        >
          <ListItemIcon classes={{ root: classes.ListItemIconCss }}>
            <FontAwesomeIcon icon={faAddressBook} />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.ListItemTextCss }}
            primary="Contacts"
          />
        </ListItem>

        <ListItem
          button
          disableGutters
          classes={{ button: classes.ListItemCss }}
        >
          <ListItemIcon classes={{ root: classes.ListItemIconCss }}>
            <ChatBubbleIcon className={classes.ImMsgIcon} />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.ListItemTextCssIM }}
            primary="Messages"
          />
        </ListItem>

        <ListItem
          button
          disableGutters
          classes={{ button: classes.ListItemCss }}
        >
          <ListItemIcon classes={{ root: classes.ListItemIconCss }}>
            <FontAwesomeIcon icon={faShieldAlt} />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.ListItemTextCss }}
            primary="Advance"
          />
        </ListItem>



        <ListItem 
            button disableGutters 
            className={
                (clickedItem === 'manager') ? classes.ListItemCssClicked :
                (rootPage === 'manager' && managerPageIndex >= 0) 
                ? classes.ListItemCssActive
                : classes.ListItemCss
            }
            onClick={()=>{openSubNavigation('manager')}}
        >
                    <ListItemIcon 
                        className={
                            ((rootPage === 'manager' && managerPageIndex >= 0) || (clickedItem === 'manager')) 
                            ? classes.ListItemIconCssActive
                            : classes.ListItemIconCss
                        }
                    >
                        <FontAwesomeIcon icon={faUsers} />
                    </ListItemIcon>
                    <ListItemText 
                        classes={
                            ((rootPage === 'manager' && managerPageIndex >= 0) || (clickedItem === 'manager')) 
                            ? {primary: classes.ListItemTextCssActive} 
                            : {primary: classes.ListItemTextCss}
                        }
                        primary='Manager' 
                    />
                </ListItem>

                <ManagerSubMenu 
                    openState = {(subNavSelected === 'manager') ? true : false}
                    closeSubNavigation = {()=>{closesSubNavgation()}}
                />

        <ListItem
          button
          disableGutters
          classes={{ button: classes.ListItemCss }}
        >
          <ListItemIcon classes={{ root: classes.ListItemIconCss }}>
            <FontAwesomeIcon icon={faUserShield} />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.ListItemTextCss }}
            primary="Admin"
          />
        </ListItem>
      </List>
    </div>
  );
  return (
    <React.Fragment>
      <Hidden only="xs">
        <Drawer
          classes={{ paperAnchorLeft: classes.drawer }}
          variant="permanent"
        >
          <div>{SideBarListItems}</div>
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default withStyles(styles)(SideNavigationsMenu);
