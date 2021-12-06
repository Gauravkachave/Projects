import { Button, Grid, Typography } from '@material-ui/core';

import {KeyboardBackspaceRounded} from '@material-ui/icons';
// import { Link } from 'react-router-dom';
import React from 'react';
// import SomethingWentWrg from '../../assets/svg/404.jpg';

const AppError = props => {
    return (
        <Grid container className='page-error_wrapper'>
            <Grid item className='page-error_grid'>
                <Grid item className='page-error_content'>
                    <h2 className='page-error_heading'>Something went wrong</h2>
                    <Typography variant='p' className='page-error_message'>
                        We are working on it and we'll fix it as soon as possible.
                    </Typography>
                    <div
                        onClick={() => {
                            window.location.reload();
                        }}
                        className='go--back__link'
                    >
                        <Button variant='contained' className='go--back__link-btn'>
                            <KeyboardBackspaceRounded/>
                            Go Back
                        </Button>
                    </div>
                </Grid>

                <Grid item className='page-error_img-grid'>
                    <img 
                    //   src={SomethingWentWrg} 
                    //   alt={SomethingWentWrg} 
                      className='page-error_img' 
                      style={{ width: '40%',margin: '0 27em' }} 
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AppError;
