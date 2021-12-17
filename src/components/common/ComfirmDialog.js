import React from 'react';
import PropTypes from 'prop-types';
import Span from "@material-ui/core/Box";
import {
    withStyles, Grid, Typography, Button, Dialog, DialogActions,
    DialogContent, Divider
} from "@material-ui/core";


const styles = () => ({
    UserProfileTitles: { fontSize: 21, color: '#302a2a' },
    confirmHeader:{color:'#fb6e8a'},
    WarningDialogContent:{'&:first-child':{paddingTop:10, padding: '0 24px 10px'}},
    deleteAction: { padding: 0, margin: '0 0 20px', justifyContent: 'center'}
});


const ConfirmDialog = (props) => {
    const { classes, deleteConfirm, open, deleteName, title, yesTitle, noTitle, yesBtnClass} = props;
    return (
        <React.Fragment>
            <Grid container direction="row">
                <Grid item xs={12} sm={8} md={8} lg={8}>
                    <Dialog
                        open={open || false}
                    >
                        <DialogContent className={classes.WarningDialogContent}>
                            <Typography variant="h6" className={classes.confirmHeader}>
                                {(title) ? title : 'Unsubscribe Confirmation!'}
                            </Typography>
                            <Span my={1}> <Divider /></Span>
                            <Typography variant="subtitle1">
                                {deleteName}
                            </Typography>
                        </DialogContent>
                        <DialogActions className={classes.deleteAction}>
                            <Button
                                onClick={()=>{ deleteConfirm(true); }}
                                color={(yesBtnClass) ? yesBtnClass : "secondary"}
                                size="small"
                                variant='contained'
                            >
                                { (yesTitle) ? yesTitle : 'Yes Unsubscribe'}
                            </Button>
                            <Span ml={3}/>
                            <Button
                                onClick={()=>{ deleteConfirm(false); }}
                                color="inherit"
                                size="small"
                                variant='contained'
                            >
                                { (noTitle) ? noTitle : 'Cancel'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

ConfirmDialog.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ConfirmDialog);