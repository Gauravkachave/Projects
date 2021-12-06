import React from 'react'
import Span  from "@material-ui/core/Box";
import Circularloader from '../../helper/loaders/CircularLoader';
import { withStyles, Typography, Divider, Grid, FormControl, TextField, Button, FormHelperText } from '@material-ui/core';

const styles = (theme) =>({
    Title:{fontSize:20, fontWeight:'bold'},
    SaveBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 28px', fontSize:11, color:'#fb6e8a', marginTop:24},
    textField : { fontSize : 12, color: '#2b2b2b',padding:'12px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    cssLabel: {
        color:'#908f8f',
        transform:"translate(14px, 13px) scale(1)",
        fontSize: 13,
    },
    LableShrink:{fontSize:15, transform:'translate(17px, -4px) scale(0.75) !important', color:'#232323'},
    NameInputHelperText:{color:'#636363',marginTop:2},
    textFieldMessage : { fontSize : 12, color: '#2b2b2b',paddingRight:10,background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
})

const EditSyncGroups = (props) => {
    const {classes,inputs,errors,updateGroup,handleChange,btnLoader} = props;
    return (
        <React.Fragment>
            <Span px={4}>
                <Typography variant="subtitle2" className={classes.Title}>Edit Sync Group</Typography>
                <Span mb={3.7}><Divider/></Span>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Typography variant='subtitle1'>About Group</Typography>
                        <Typography variant='caption'>
                            Groups are collections of subscribers that make it easy for you to send a campaign to a specific group of subscribers. 
                            You can manually add users to groups, or you can have users who text a certain keyword filtered into a group the first 
                            time they text that keyword.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={5}>
                        <Span mt={1.2}/>
                        <FormControl fullWidth>
                            <TextField
                                id="group_name"
                                label="Group Name"
                                type="text"
                                variant="outlined"
                                name='grp_name'
                                InputProps={{ classes: {input: classes.textField,},}} 
                                InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                value={inputs['grp_name'] || ''}
                                onChange={(event) => {
                                    handleChange(
                                        event.target.name,
                                        event.target.value
                                    );
                                }}
                            />
                            <FormHelperText error> {errors['grp_name']}</FormHelperText>
                            <Typography variant="caption" className={classes.NameInputHelperText}>
                                Make your group name descriptive so that you can quickly know what group it reaches.
                            </Typography>
                        </FormControl> 
                        <Span mt={2}/>
                        <FormControl fullWidth>
                            <TextField
                                id="notes"
                                label="Notes"
                                type="text"
                                variant="outlined"
                                name='grp_note'
                                multiline
                                rows={4}
                                InputProps={{ classes: {input: classes.textFieldMessage,multiline: classes.MultitlineInput,},}}
                                InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                value={inputs['grp_note'] || ''}
                                onChange={(event) => {
                                    handleChange(
                                        event.target.name,
                                        event.target.value
                                    );
                                }}
                            />
                            <FormHelperText error>{errors['grp_note']}</FormHelperText>
                            <Typography variant="caption" className={classes.NameInputHelperText}>
                                Your notes are optional. Your contacts won't ever see them.
                            </Typography>
                        </FormControl> 
                        <Span align="right" mt={2}>
                            <Button variant="outlined" className={classes.SaveBtn} onClick={updateGroup}>
                            {btnLoader && <Circularloader/>}
                            Save Changes To Group
                            </Button>
                        </Span>
                    </Grid>
                </Grid>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(EditSyncGroups);



