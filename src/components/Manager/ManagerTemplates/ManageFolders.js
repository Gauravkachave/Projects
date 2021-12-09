import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Span from "@material-ui/core/Box";
import {
    withStyles, Typography, Divider, Table, TableHead, TableRow, TableBody, TableCell, TableContainer,
    Paper, Dialog, DialogContent, IconButton, Radio, FormControl, TextField, Grid, Button, Hidden, Card, CardHeader, Avatar, Collapse, Checkbox, CardContent,CircularProgress
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsers } from '@fortawesome/free-solid-svg-icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
const styles = (theme) => ({
    ManageFoldersTitle: { fontSize: 20, fontWeight: 'bold' },
    TableHeadCss: { background: '#ebebeb', lineHeight: '6px !important' },
    TableCss: { border: '1px solid #e0e0e0' },
    TableCellHead: { lineHeight: '6px !important', fontSize: 12, color: '#585757', fontWeight: 'bold' },
    TableCellCss: { padding: '0px 16px', fontSize: 13, color: '#585757' },
    TableCellEditCss: { padding: '0px 16px', fontSize: 13, color: '#fb6e8a', cursor: 'pointer' },
    StatusActiveIcon:{fontSize:26, marginTop:7, color:'#82d53c'},
    StatusInactiveIcon:{fontSize:26, marginTop:7, color:'#999999'},
    OpenCategory: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 16 },
    DialogContentPadding: { padding: '0px 15px 8px 15px !important' },
    OpenCategoryCloseIcon: { padding: 8 },
    SelectedRadioBtn: { color: '#fb6e8a !important', padding: 0, margin: '0px 3px 0px 0px' },
    textField: { fontSize: 12, color: '#2b2b2b', padding: '12px 13px', background: '#fff', '&::placeholder': { color: '#000', fontWeight: 500 } },
    cssLabel: {
        color: '#908f8f',
        transform: "translate(14px, 13px) scale(1)",
        fontSize: 13,
    },
    LableShrink: { fontSize: 15, transform: 'translate(17px, -4px) scale(0.75) !important', color: '#232323' },
    ManageFolderBtn: { borderRadius: 50, borderColor: '#fb6e8a', padding: '10px 39px', fontSize: 11, color: '#fb6e8a', marginTop: 24, marginBottom: 10 },
    CreateGroupBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 20px', fontSize:11, color:'#fb6e8a',marginLeft:20},
    [theme.breakpoints.only('xs')]: {
        ResponsiveView: { display: 'grid' },
        ResponsiveInput: { marginTop: 8 },
        GroupTitle: { fontSize: 17, },
        ActionButns: { background: '#fb6e8a', color: '#fff', minWidth: 73, padding: '9px 0px', fontSize: 16, marginTop: 16 },
        DeleteBtn: { borderRadius: 50, border: '1px solid #ff2828', padding: '8px 15px', fontSize: 11, color: '#ff2828', width: '100%' },

    //mobile css
    SubscriberInfo: { fontSize: 12, color: '#353535' },
    CardContentPadding: { padding: '0px 23px 12px 23px !important' },
    GroupAvatar: { background: '#fb6e8a', marginLeft: 5 
},
    GroupCard: { marginBottom: 15 },
    GroupName: {  fontSize: "14px" },
    CardHeadCss: { alignItems: "flex-start" },
    editClick:{ padding: '0px 16px', fontSize: 13, color: '#fb6e8a', cursor: 'pointer',marginTop:"6px"},   
 },
})

const ManageFolders =(props) =>{
    const { classes,folders,contentLoader,handleEdit,editDialog,inputs,handleDialog
            ,folderState,onUpdateChange,folderName,folderPassword,updateCategory} = props;
    
    return (
        <React.Fragment>
            <Span px={4}>
                <Span display='flex' alignItems='center'>
                <Typography variant="subtitle2" className={classes.ManageFoldersTitle}>
                    Manage Folders
                </Typography>
                <Button variant="outlined" 
                    className={classes.CreateGroupBtn}
                    component={Link} 
                    to={'/manager/create-normal-folder'}
                >
                        Create Folder
                </Button>
            </Span>
                <Span mb={3.7} mt={1}><Divider /></Span>
                <Hidden only="xs">
                    <TableContainer component={Paper}>
                        <Table className={classes.TableCss}>
                            <TableHead className={classes.TableHeadCss}>
                                <TableRow>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="60%">Folder Name</TableCell>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="30%">Password</TableCell>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="20%">Action</TableCell>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="10%">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(folders && folders.length > 0) ? 
                                folders.map((option, index) => (
                                
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>{option.folder_name}</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>{option.folder_password}</TableCell>
                                    <TableCell 
                                        classes={{ root: classes.TableCellEditCss }} 
                                        onClick={() => { handleEdit(option.id)}}>
                                            Edit
                                    </TableCell> 

                                        <TableCell classes={{root:classes.TableCellCss}}>
                                            {(option.folder_state === 'A') ?
                                                <FiberManualRecordIcon className={classes.StatusActiveIcon}/> :
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
                                        <Span>Folders not added yet.</Span>
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
                            Update Folder
                            <IconButton className={classes.OpenCategoryCloseIcon} onClick={handleDialog} ><CloseIcon /></IconButton></Typography>
                        <Divider />
                        <Span mt={1} mb={3}>
                            <Radio 
                                name='folder_state'
                                value='A'
                                classes={{ root: classes.SelectedRadioBtn, checked: classes.SelectedRadioBtn }} 
                                checked={folderState === 'A' ? true :false} 
                                onChange={event =>{
                                    onUpdateChange(
                                        event.target.name,
                                        event.target.value
                                    )
                                }}
                                >
                            </Radio>
                                
                            <Typography variant="caption">Active</Typography>
                            &nbsp;&nbsp;&nbsp;
                            <Radio 
                                name='folder_state'
                                value='I'
                                classes={{ root: classes.SelectedRadioBtn, checked: classes.SelectedRadioBtn }} 
                                checked={folderState === 'I' ? true :false}
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
                                        id="id"
                                        label="Edit Folder Name"
                                        type="text"
                                        variant="outlined"
                                        name='folder_name'
                                        value={folderName}
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
                        &nbsp;
                        <Grid container direction="row">
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="id"
                                        label="Edit Folder Password"
                                        type="text"
                                        variant="outlined"
                                        name='folder_password'
                                        value={folderPassword}
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
                        <Button variant="outlined" className={classes.ManageFolderBtn} onClick={updateCategory} >Submit</Button>
                    </DialogContent>
                </Dialog>

            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(ManageFolders);
