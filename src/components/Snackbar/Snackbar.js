import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    error: {
        backgroundColor: '#333',
        color: '#fff',
        fontSize: 14,
        borderLeft: '4px solid red'
    },
    success: {
        backgroundColor: '#fb6e8a',
        color: '#fff',
        fontSize: 14,
        borderLeft: '4px solid #f9f9f9'
    },
    warning: {
        backgroundColor: '#333',
        color: '#fff',
        fontSize: 14,
        borderLeft: '4px solid orange'
    },
    info: {
        backgroundColor: '#2196f3',
        color: '#fff',
        fontSize: 14
    },
    close: {
        padding: theme.spacing(0.5)
    }
});

const Snackbar = (props) => {
    const { classes, open, message, variant, autoHideDuration, closeSnackBar } = props;
    const [Open, setOpen] = React.useState((open) ? open : false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        closeSnackBar();
    };

    return (
        <div className={classes.root}>
            <MuiSnackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={Open}
                autoHideDuration={autoHideDuration || null}
                onClose={handleCloseSnackbar}
                ContentProps={{
                    classes: {
                        root: classNames(classes[variant])
                    },
                    'aria-describedby': 'message-id'
                }}
                message={<span id='message-id'>{message}</span>}
                action={[
                    <IconButton
                        key='close'
                        aria-label='Close'
                        color='inherit'
                        className={classes.close}
                        onClick={handleCloseSnackbar}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </div>
    );
}

Snackbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Snackbar);
