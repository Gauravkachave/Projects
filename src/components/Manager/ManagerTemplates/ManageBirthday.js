import React from 'react'
import Span  from "@material-ui/core/Box";
import { withStyles, Typography, Divider, Grid, FormControl, TextField, Button, FormHelperText, Select, MenuItem } from '@material-ui/core';

const styles = (theme) =>({
    Title:{fontSize:20, fontWeight:'bold'},
    SubmitBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 28px', fontSize:11, color:'#fb6e8a', marginTop:24},
    textFieldFolder:{fontSize : 12, color: '#2b2b2b',padding:'10px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    textField : { fontSize : 12, color: '#2b2b2b',padding:'12px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    cssLabel: {
    color:'#908f8f',
    transform:"translate(14px, 13px) scale(1)",
    fontSize: 13,
    },
    publicGrp:{fontSize:16, fontWeight:"bold"},
    LableShrink:{fontSize:15, transform:'translate(17px, -4px) scale(0.75) !important', color:'#232323'},
    textFieldMessage : { fontSize : 12, color: '#2b2b2b',paddingRight:10,background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    MultitlineInput:{paddingTop:10, paddingBottom:40},
    OutlinedInput:{padding:'9px 10px', fontSize:14},
    // SelectContainer:{marginTop:115}
})

const BirthdayMessage = (props) => {
    const {classes, inputs, errors, handleChange, handleSubmit, publicGroupList, privateGroupList} = props;

    return (
        <React.Fragment>
            <Span px={4} mt={1}>
                <Typography variant="subtitle2" className={classes.Title}>Change Birthday Message</Typography>
                <Span mb={3.7}><Divider/></Span>
                <Grid container direction="row">
                    <Grid item xs={12} sm={10} md={8} lg={5}>
                        <FormControl variant='outlined' fullWidth>
                                <TextField
                                select
                                name="select_group"
                                variant='outlined'
                                value={inputs["select_group"] || ""}
                                onChange={(e) => handleChange(e.target.name,e.target.value)}
                                InputProps={{ classes: {input: classes.textFieldFolder,},}}
                                >
                                <MenuItem value="select_group" >Select Groups</MenuItem>

                                <Span ml={2}><Typography variant='subtitle2' className={classes.publicGrp}>Public Group</Typography></Span>

                                {publicGroupList && publicGroupList.map((option) =>(
                                <MenuItem key={option.grp_id} value={option.grp_id}>
                                        {option.grp_name}
                                </MenuItem>
                                ))}

                                <Span ml={2}><Typography variant='subtitle2' className={classes.publicGrp}>Sync Group</Typography></Span>
                                {privateGroupList && privateGroupList.map((option) =>(
                                <MenuItem key={option.grp_id} value={option.grp_id}>
                                        {option.grp_name}
                                </MenuItem>
                                ))}
                                </TextField>
                        </FormControl>
                        <Span mt={3}/>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name="birthday_message"
                                    id="birthday_message"
                                    label="Birthday Message"
                                    type="text"
                                    variant="outlined"
                                    value={inputs["birthday_message"] || " "}
                                    multiline
                                    rows={5}
                                    InputProps={{ classes: {input: classes.textFieldMessage,multiline: classes.MultitlineInput,},}}
                                    InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                    onChange = {(e) => handleChange(e.target.name,e.target.value)}
                                />
                                 {<FormHelperText error>{errors["birthday_message"] || ""}</FormHelperText>}
                            </FormControl> 
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="outlined" className={classes.SubmitBtn} onClick = {handleSubmit} >Submit</Button>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(BirthdayMessage);
