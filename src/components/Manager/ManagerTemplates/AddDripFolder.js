import React from 'react'
import Span  from "@material-ui/core/Box";
import Circularloader from '../../../helper/loaders/CircularLoader';
import { withStyles, Typography, Divider, Grid, FormControl, TextField, Radio, Button, FormHelperText } from '@material-ui/core';

const styles = (theme) =>({
    AddFolderTitle:{fontSize:20, fontWeight:'bold'},
    textField : { fontSize : 12, color: '#2b2b2b',padding:'12px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
        cssLabel: {
        color:'#908f8f',
        transform:"translate(14px, 13px) scale(1)",
        fontSize: 13,
    },
    LableShrink:{fontSize:15, transform:'translate(17px, -4px) scale(0.75) !important', color:'#232323'},
    SelectedRadioBtn:{color:'#fb6e8a !important', padding:0, margin:'0px 3px 0px 0px'},
    AddFolderBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 39px', fontSize:11, color:'#fb6e8a', marginTop:24},

    [theme.breakpoints.only('lg')]: {
        InputWidth:{width:350}
    },
})

const  AddDripFolder = (props) =>  {
    const {classes, handleChange, addFolderBtn, inputs, errors,btnLoader } = props;
    return (
        <React.Fragment>
            <Span px={4}>
                <Typography variant="subtitle2" className={classes.AddFolderTitle}>
                    Add Drip Folder
                </Typography>
                <Span mb={3.7}><Divider/></Span>
                <Grid container direction="row">
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <FormControl fullWidth className={classes.InputWidth}>
                            <TextField
                                id="folder_name"
                                name="folder_name"
                                label="Folder Name"
                                type="text"
                                value={inputs['folder_name'] || ''}
                                variant="outlined"
                                InputProps={{ classes: {input: classes.textField, focused:classes.textFieldFocus},}}
                                InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                onChange= {(e) => handleChange(e.target.name,e.target.value)}
                            />
                            { <FormHelperText error>{errors['folder_name']}</FormHelperText>}
                        </FormControl>
                        <Span mt={3.6}/>
                        <FormControl fullWidth className={classes.InputWidth}>
                            <TextField
                                id="folder_password"
                                name="folder_password"
                                label="Password"
                                type="password"
                                value={inputs["folder_password"] || ''}
                                variant="outlined"
                                InputProps={{ classes: {input: classes.textField,},}}
                                InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                onChange={(e)=> handleChange(e.target.name,e.target.value)}
                            />
                             {<FormHelperText error>{errors['folder_password'] || ''}</FormHelperText>}
                        </FormControl>
                        <Span mt={3.2}/>
                        <div>
                            <Radio 
                                classes={{root:classes.SelectedRadioBtn,checked:classes.SelectedRadioBtn}}
                                name="folder_state"
                                value='A'
                                checked={(inputs['folder_state'] === 'A')?true : false }
                                onChange={(event) => {
                                    handleChange(
                                        event.target.name,
                                        event.target.value
                                    );
                                }}
                                />
                            <Typography variant="caption">Active</Typography>
                            &nbsp;&nbsp;
                            <Radio 
                                classes={{root:classes.SelectedRadioBtn,checked:classes.SelectedRadioBtn}}
                                name="folder_state"
                                value='I'
                                checked={(inputs['folder_state'] === 'I') ? true : false}
                                onChange={(event) => {
                                    handleChange(
                                        event.target.name,
                                        event.target.value
                                    );
                                }}
                                />
                            <Typography variant="caption">Inactive</Typography>
                        </div>
                        {<FormHelperText error>{errors['folder_state'] || ''}</FormHelperText>}
                        <Button 
                            variant="outlined" 
                            className={classes.AddFolderBtn} 
                            onClick = {addFolderBtn}
                        >
                        {btnLoader && <Circularloader/>}
                            Add Folder
                        </Button>
                    </Grid>
                </Grid>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(AddDripFolder);
