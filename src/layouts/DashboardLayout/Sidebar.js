import React from 'react'
import { withStyles, Drawer, Hidden } from '@material-ui/core';
import SideNavigationsMenu from '../../components/SideNavigations/SideNavigationsMenu';
import {withRouter} from 'react-router-dom';

const styles = (theme) => ({
    drawer: { background: '#fb6e8a', width: 70, borderRight: 'none', marginTop: 62 },
    drawerClasszindex:{zIndex:'1400 !important'},

    [theme.breakpoints.only('xs')]: {
        drawer:{position:'relative !important', zIndex:'1200 !important'},
    },
});

const SideBar = (props) => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Hidden only='xs'>
                <Drawer
                    classes={{ paperAnchorLeft: classes.drawer, paper:classes.drawerClasszindex }}
                    variant="permanent"
                >
                    <SideNavigationsMenu 
                        pageUri = {props.location.pathname}
                    />
                </Drawer>
            </Hidden>
        </React.Fragment>
    );
}

export default withStyles(styles)(withRouter(SideBar));
