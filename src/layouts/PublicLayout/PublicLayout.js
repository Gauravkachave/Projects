import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

export default function PublicLayout(props) {
  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12}>
         {props.children}
      </Grid>
    </Grid>
  );
}