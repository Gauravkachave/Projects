import React, { useState } from 'react'
import Span from "@material-ui/core/Box";
import {
    withStyles, Typography, Divider, Table, TableHead, TableRow, TableBody, TableCell, TableContainer, CircularProgress,
    Paper, Dialog, DialogContent, IconButton, Radio, FormControl, TextField, Grid, Button, MenuItem, Hidden, Card, CardHeader, CardContent, Avatar, Collapse
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    ManageCategoriesTitle: { fontSize: 20, fontWeight: 'bold' },
    textFieldFolder: { fontSize: 12, color: '#2b2b2b', padding: '10px 13px', background: '#fff', '&::placeholder': { color: '#000', fontWeight: 500 } },
    TableHeadCss: { background: '#ebebeb', lineHeight: '6px !important' },
    TableCss: { border: '1px solid #e0e0e0' },
    TableCellHead: { lineHeight: '6px !important', fontSize: 12, color: '#585757', fontWeight: 'bold' },
    TableCellCss: { padding: '0px 16px', fontSize: 13, color: '#585757' },
    TableCellEditCss: { padding: '0px 16px', fontSize: 13, color: '#fb6e8a', cursor: 'pointer' },
    StatusActiveIcon: { fontSize: 26, marginTop: 7, color: '#82d53c' },
    StatusInactiveIcon: { fontSize: 26, marginTop: 7, color: '#999999' },
    OpenCategory: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 16 },
    DialogContentPadding: { padding: '0px 15px 8px 15px !important' },
    OpenCategoryCloseIcon: { padding: 8 },
    CreateGroupBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 20px', fontSize:11, color:'#fb6e8a',marginLeft:20},
    SelectedRadioBtn: { color: '#fb6e8a !important', padding: 0, margin: '0px 3px 0px 0px' },
    textField: { fontSize: 12, color: '#2b2b2b', padding: '12px 13px', background: '#fff', '&::placeholder': { color: '#000', fontWeight: 500 } },
    cssLabel: {
        color: '#908f8f',
        transform: "translate(14px, 13px) scale(1)",
        fontSize: 13,
    },
    LableShrink: { fontSize: 15, transform: 'translate(17px, -4px) scale(0.75) !important', color: '#232323' },
    ManageFolderBtn: { borderRadius: 50, borderColor: '#fb6e8a', padding: '10px 39px', fontSize: 11, color: '#fb6e8a', marginTop: 24, marginBottom: 10 },

    [theme.breakpoints.only('lg')]: {
        InputWidth: { width: 350 }
    },
    [theme.breakpoints.only('xs')]: {
        //mobile css
        SubscriberInfo: { fontSize: 11, color: '#353535' },
        CardContentPadding: { padding: '0px 23px 12px 23px !important' },
        GroupAvatar: { background: '#fb6e8a', marginLeft: 5 },
        GroupCard: { marginBottom: 15 },
        GroupName: { cursor: 'pointer', fontSize: "12px" },
        CardHeadCss: { alignItems: "flex-start" },
        editClick: { padding: '0px 16px', fontSize: 13, color: '#fb6e8a', cursor: 'pointer', marginTop: "6px" },
    },
})
const FolderValues = [
    { value: 'select_folder', label: 'Select Folder' },
    { value: 'texts_to_consultants', label: 'Text to Consultants' },
    { value: 'texts_to_customer', label: 'Text to Customers' },
    { value: 'texts_to_new_leads', label: 'Text to New Leads' },
    { value: 'spanish_texts_to_consultants', label: 'Spanish Text to Consultants' },
    { value: 'days_followup', label: '21 Days Follow Up Script' },
];
const ManageDripCategories = (props) => {
    const { classes, handleChange, folder_id, folderList, categoryList, contentLoader, editDialog, handleDialog, handleEdit, catName, 
            catId, catState, onUpdateChange, updateCategory} = props;
    

    return (
        <React.Fragment>
            <Span px={4}>
                <Span display='flex' alignItems='center'>
                    <Typography variant="subtitle2" className={classes.ManageCategoriesTitle}>
                    Manage Drip Category
                    </Typography>
                    <Button variant="outlined" 
                        className={classes.CreateGroupBtn}
                        component={Link} 
                        to={'/manager/add-drip-category'}
                    >
                        Create Drip Category
                    </Button>
                </Span>
                <Span mb={3.7}><Divider /></Span>
                <Grid container direction="row">
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <FormControl fullWidth className={classes.InputWidth}>
                            <TextField
                                select
                                value={folder_id}
                                variant="outlined"
                                onChange={(e) => handleChange(e.target.value)}
                                InputProps={{ classes: { input: classes.textFieldFolder, }, }}
                            >
                                <MenuItem value={folder_id}>Select Folder</MenuItem>
                                {folderList && folderList.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.folder_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>
                <Span mt={3} />
                {/* mobileview hide */}
                <Hidden only="xs">
                    <TableContainer component={Paper}>
                        <Table className={classes.TableCss}>
                            <TableHead className={classes.TableHeadCss}>
                                <TableRow>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="90%">Subcategory</TableCell>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="5%">Action</TableCell>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="5%">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {(categoryList && categoryList.length > 0) ? 
                                categoryList.map((option, index) => (
                                <TableRow key={index}>
                                    <TableCell 
                                        classes={{ root: classes.TableCellCss }} >
                                            {option.cat_name}
                                    </TableCell>
                                    <TableCell 
                                        classes={{ root: classes.TableCellEditCss }} 
                                        onClick={() => { handleEdit(option.cat_id)}}
                                        >
                                            Edit
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        {(option.cat_state === 'A') ?
                                            <FiberManualRecordIcon className={classes.StatusActiveIcon}/> 
                                            :
                                            <FiberManualRecordIcon className={classes.StatusInactiveIcon}/>
                                        }
                                    </TableCell>
                                </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell align="center" colSpan="4">
                                    {(contentLoader) 
                                    ? 
                                    <Span align="center">
                                        <CircularProgress size={22} color='secondary'/>
                                    </Span>
                                    :
                                        <Span>No subcategories found .</Span>
                                    }
                                    </TableCell>
                                </TableRow>
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Hidden>
                <Dialog open={editDialog} fullWidth maxWidth="sm">
                    <DialogContent className={classes.DialogContentPadding}>
                        <Typography variant="h6" className={classes.OpenCategory}>
                            Update Category
                            <IconButton className={classes.OpenCategoryCloseIcon} onClick={handleDialog}><CloseIcon /></IconButton></Typography>
                        <Divider />
                        <Span mt={1} mb={3}>
                            <Radio 
                                name="cat_state"
                                value="A"
                                classes={{ root: classes.SelectedRadioBtn, checked: classes.SelectedRadioBtn }} 
                                checked={catState === 'A' ? true :false} 
                                onChange={event =>{
                                    onUpdateChange(
                                        event.target.name,
                                        event.target.value
                                    )
                                }}
                            />
                            <Typography variant="caption">Active</Typography>
                            &nbsp;&nbsp;&nbsp;
                            <Radio 
                                name="cat_state"
                                value="I"
                                classes={{ root: classes.SelectedRadioBtn, checked: classes.SelectedRadioBtn }} 
                                checked={catState === 'I' ? true :false} 
                                onChange={event =>{
                                    onUpdateChange(
                                        event.target.name,
                                        event.target.value
                                    )
                                }}
                                
                            />
                            <Typography variant="caption">Inactive</Typography>
                        </Span>
                        <Grid container direction="row">
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="cat_name"
                                        id="cat_id"
                                        label="Edit Category Name"
                                        type="text"
                                        value={catName}
                                        variant="outlined"
                                        InputProps={{ classes: { input: classes.textField, }, }}
                                        InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
                                        onChange={event =>{
                                            onUpdateChange(
                                                event.target.name,
                                                event.target.value
                                            )
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button variant="outlined" className={classes.ManageFolderBtn} onClick={updateCategory}>Submit</Button>
                    </DialogContent>
                </Dialog>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(ManageDripCategories);
