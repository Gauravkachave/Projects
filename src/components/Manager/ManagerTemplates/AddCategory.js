import React,{useState} from 'react'
import Span  from "@material-ui/core/Box";
import { withStyles, Typography, Divider, Grid, FormControl, TextField, MenuItem, Button,FormHelperText } from '@material-ui/core';
import Circularloader from '../../../helper/loaders/CircularLoader';

const styles = (theme) =>({
    AddCategorytitle:{fontSize:20, fontWeight:'bold'},
    textField : { fontSize : 12, color: '#2b2b2b',padding:'12px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
        cssLabel: {
        color:'#908f8f',
        transform:"translate(14px, 13px) scale(1)",
        fontSize: 13,
    },
    LableShrink:{fontSize:15, transform:'translate(17px, -4px) scale(0.75) !important', color:'#232323'},
    textFieldFolder:{fontSize : 12, color: '#2b2b2b',padding:'10px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    AddCategoryBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 39px', fontSize:11, color:'#fb6e8a', marginTop:24},
    NameInputHelperText:{color:'#636363',marginTop:2}
})

const AddCategory= (props)=> {
    const {classes,selectFolder,handleChange,inputs,errors,AddCategoryBtn,btnLoader} = props;

    return (
        <React.Fragment>
            <Span px={4}>
                <Typography variant="subtitle2" className={classes.AddCategorytitle}>
                {btnLoader && <Circularloader/>}
                    Add Category
                </Typography>
                <Span mb={3.7}><Divider/></Span>
                <Grid container direction="row">
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <FormControl fullWidth>
                            <TextField
                                  select
                                name="folder_id"
                                value={inputs['folder_id'] || ''}
                                  variant="outlined"
                                  label=''
                                onChange={event =>{
                                    handleChange(
                                        event.target.name,
                                        event.target.value
                                    )
                                }}

                                InputProps={{ classes: {input: classes.textFieldFolder,},}}
                            >
                                <MenuItem value='0'>
                                        Select Folder
                                    </MenuItem>

                                {selectFolder && selectFolder.map(option => (
                                    (option.folder_state === 'A') &&
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.folder_name}
                                </MenuItem>
                                ))}
                            
                            </TextField>
                            <FormHelperText error>
                                    {errors['folder_id']}
                                </FormHelperText>
                        </FormControl>
                        <Span mt={3.2}/>
                        <FormControl fullWidth>
                            <TextField
                                id="cat_name"
                                label="Name"
                                type="text"
                                name='cat_name'
                                value={inputs['cat_name'] || ''}
                                variant="outlined"
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
                            {errors['cat_name']}
                            </FormHelperText>
                            <Typography variant="caption" className={classes.NameInputHelperText}>
                                Give your template a descriptive name that will be used to identify reports and responses.
                            </Typography>
                        </FormControl>
                        <Button variant="outlined" className={classes.AddCategoryBtn} onClick={AddCategoryBtn}>Add Category</Button>
                    </Grid>
                </Grid>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(AddCategory);