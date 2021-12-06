import React from 'react'
import Span  from "@material-ui/core/Box";
import Circularloader from '../../helper/loaders/CircularLoader';
import { withStyles, Typography, Divider, Grid, FormControl, TextField, Button, FormHelperText } from '@material-ui/core';

const styles = (theme) =>({
    GroupTitle:{fontSize:20, fontWeight:'bold'},
    CreateGroupBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 28px', fontSize:11, color:'#fb6e8a', marginTop:24},
    textField : { fontSize : 12, color: '#2b2b2b',padding:'12px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    cssLabel: {
    color:'#908f8f',
    transform:"translate(14px, 13px) scale(1)",
    fontSize: 13,
    },
    LableShrink:{fontSize:15, transform:'translate(17px, -4px) scale(0.75) !important', color:'#232323'},
    NameInputHelperText:{color:'#636363',marginTop:2},

    textFieldMessage : { fontSize : 12, color: '#2b2b2b',paddingRight:10,background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    MultitlineInput:{paddingTop:10, paddingBottom:40},
})

const CreateNewGroup = (props) => {
    const {classes,btnLoader,handleChange,errors,inputs,onCreateGroupBtn} = props;

    return (
        <React.Fragment>
            <Span px={4}>
                <Typography variant="subtitle2" className={classes.GroupTitle}>Create A New Public Group</Typography>
                <Span mb={3.7}><Divider/></Span>
                <Grid container direction="row">
                    <Grid item xs={12} sm={10} md={8} lg={5}>
                        <FormControl fullWidth>
                            <TextField
                                id="grp_name"
                                label="Group Name"
                                type="text"
                                variant="outlined"
                                name="grp_name"
                                value={inputs['grp_name'] || ''}
                                InputProps={{ classes: {input: classes.textField,},}}
                                InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                onChange={event => {
                                    handleChange(
                                        event.target.name,
                                        event.target.value
                                    );
                                }}
                            />
                            <FormHelperText error>
                                {errors['grp_name']}
                                </FormHelperText>

                            <Typography variant="caption" className={classes.NameInputHelperText}>
                                Make your group name descriptive so that you can quickly know what group it reaches.
                            </Typography>
                        </FormControl>
                        <Span mt={3}/>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl fullWidth>
                                <TextField
                                    id="message"
                                    label="Message"
                                    type="text"
                                    variant="outlined"
                                    multiline
                                    rows={5}
                                    name='grp_note'
                                    value={inputs['grp_note'] || ''}
                                    InputProps={{ classes: {input: classes.textFieldMessage,multiline: classes.MultitlineInput,},}}
                                    InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                    onChange={event =>{
                                        handleChange(
                                            event.target.name,
                                            event.target.value
                                        )
                                    }}
                                />
                                 <FormHelperText error>
                                     {errors['grp_note']}
                                     </FormHelperText>
                                <Typography variant="caption" className={classes.NameInputHelperText}>
                                    Your notes are optional. Your contacts won't ever see them.
                                </Typography>
                            </FormControl> 
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="outlined" 
                        className={classes.CreateGroupBtn}
                        onClick={onCreateGroupBtn}
                        disabled={btnLoader}
                        >
                        {btnLoader && <Circularloader/>}
                        Create Group
                </Button>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(CreateNewGroup);
