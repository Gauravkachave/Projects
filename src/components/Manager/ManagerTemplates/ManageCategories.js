import React, { useState } from 'react'
import Span from "@material-ui/core/Box";
import { Link } from 'react-router-dom';
import {
    withStyles, Typography, Divider, Table, TableHead, TableRow, TableBody, TableCell, TableContainer,
    Paper, Dialog, DialogContent, IconButton, Radio, FormControl, TextField, Grid, Button, MenuItem, Hidden, Card, CardHeader, CardContent, Avatar, Collapse,CircularProgress
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const styles = (theme) => ({
    ManageCategoriesTitle: { fontSize: 20, fontWeight: 'bold' },
    textFieldFolder: { fontSize: 12, color: '#2b2b2b', padding: '10px 13px', background: '#fff', '&::placeholder': { color: '#000', fontWeight: 500 } },
    TableHeadCss: { background: '#ebebeb', lineHeight: '6px !important' },
    TableCss: { border: '1px solid #e0e0e0' },
    CreateGroupBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 20px', fontSize:11, color:'#fb6e8a',marginLeft:20},
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

const ManageCategories= (props) =>{
    const { classes ,selectFolder,inputs,handleChange,subCategory,
            contentLoader,catName,catState,handleExpandClick,handleEdit,
            editDialog,expanded,handleDialog,updateCategory,onUpdateChange} = props;

    // const [editDialog, setEditDialog] = useState(false);
    // const [expanded, setExpanded] = React.useState(false);

    // const [catName,setCatName]=useState(null);
    // const [catState,setCatState]=useState(null);
    // const handleExpandClick = () => { setExpanded(!expanded) };
    // const handleEdit = (id) => {
    //     setEditDialog(!editDialog);
    //         const data=subCategory.find(item => item.cat_id === id );
    //         setCatName(data.cat_name);
    //         setCatState(data.cat_state);
    // }

    return (
        <React.Fragment>
            <Span px={4}>
            <Span display='flex' alignItems='center'>
                <Typography variant="subtitle2" className={classes.ManageCategoriesTitle}>
                    Manage Categories
                </Typography>
                <Button variant="outlined" 
                    className={classes.CreateGroupBtn}
                    component={Link} 
                    to={'/manager/add-normal-category'}
                >
                        Add Category
                </Button>
                </Span>
                <Span mb={3.7}><Divider /></Span>
                <Grid container direction="row">
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <FormControl fullWidth className={classes.InputWidth}>
                            <TextField
                                select
                                name="folder_id"
                                value={inputs['folder_id'] || ''}
                                variant="outlined"
                                InputProps={{ classes: { input: classes.textFieldFolder, }, }}
                                onChange={event =>{
                                    handleChange(
                                        event.target.name,
                                        event.target.value
                                    )
                                }}
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
                            {(subCategory && subCategory.length > 0) ? 
                                subCategory.map((option, index) => (
                                <TableRow>
                                    <TableCell 
                                        classes={{ root: classes.TableCellCss }} >
                                            {option.cat_name}
                                    </TableCell>

                                    <TableCell classes={{ root: classes.TableCellEditCss }} onClick={() => { handleEdit(option.cat_id)}}>Edit</TableCell>
                                    {/* edit dialog */}

                                    {/* ......... */}

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
                                name='cat_state'
                                value='A'
                                classes={{ root: classes.SelectedRadioBtn, checked: classes.SelectedRadioBtn }} 
                                checked={catState === 'A' ? true :false} 
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
                                name='cat_state'
                                value='I'
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
                                        id="cat_id"
                                        label="Edit Category Name"
                                        type="text"
                                        variant="outlined"
                                        name='cat_name'
                                        value={catName}
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


                {/* ***** */}
                {/* Mobile View */}
                <Hidden only={['lg', 'md', 'sm', 'xl']}>
                    <Grid container direction='row'>
                        <Grid item xs={12}>
                            <Card className={classes.GroupCard}>
                                <CardHeader className={classes.CardHeadCss}
                                    avatar={
                                        <Span display="flex" alignItems="center">
                                            <Avatar className={classes.GroupAvatar}>
                                                <FontAwesomeIcon icon={faUsers} />
                                            </Avatar>
                                        </Span>
                                    }
                                    action={
                                        <IconButton onClick={handleExpandClick}>
                                            {(expanded) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                        </IconButton>
                                    }
                                    title={<div className={classes.GroupName}>Subcategory: New Consultant Series</div>}

                                />
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent className={classes.CardContentPadding}>
                                        <Span><Divider /></Span>
                                        <Span display="flex" alignItems="center" justifyContent="center">
                                            <Typography className={classes.editClick} onClick={handleDialog}>Edit</Typography>
                                            {/* edit dialog */}
                                            <Dialog open={editDialog} fullWidth maxWidth="sm">
                                                <DialogContent className={classes.DialogContentPadding}>
                                                    <Typography variant="h6" className={classes.OpenCategory}>
                                                        Update Category
                                                        <IconButton className={classes.OpenCategoryCloseIcon} onClick={handleDialog}><CloseIcon /></IconButton></Typography>
                                                    <Divider />
                                                    <Span mt={1} mb={3}>
                                                        <Radio classes={{ root: classes.SelectedRadioBtn, checked: classes.SelectedRadioBtn }} />
                                                        <Typography variant="caption">ON</Typography>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Radio classes={{ root: classes.SelectedRadioBtn, checked: classes.SelectedRadioBtn }} />
                                                        <Typography variant="caption">OFF</Typography>
                                                    </Span>
                                                    <Grid container direction="row">
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <FormControl fullWidth>
                                                                <TextField
                                                                    id="category_name"
                                                                    label="Edit Category Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value="New Consultant Series"
                                                                    InputProps={{ classes: { input: classes.textField, }, }}
                                                                    InputLabelProps={{ classes: { outlined: classes.cssLabel, shrink: classes.LableShrink } }}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    <Button variant="outlined" className={classes.ManageFolderBtn}>Submit</Button>
                                                </DialogContent>
                                            </Dialog>
                                            {/* ......... */}
                                            <FiberManualRecordIcon className={classes.StatusActiveIcon} />
                                        </Span>
                                    </CardContent>
                                </Collapse>
                            </Card>
                            <Card className={classes.GroupCard}>
                                <CardHeader className={classes.CardHeadCss}
                                    avatar={
                                        <Span display="flex" alignItems="center">
                                            <Avatar className={classes.GroupAvatar}>
                                                <FontAwesomeIcon icon={faUsers} />
                                            </Avatar>
                                        </Span>
                                    }
                                    action={
                                        <IconButton onClick={handleExpandClick}>
                                            {(expanded) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                        </IconButton>
                                    }
                                    title={<div className={classes.GroupName}>Subcategory:New Consultant w/out Unit Site</div>}
                                />
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent className={classes.CardContentPadding}>
                                        <Span><Divider /></Span>
                                        <Span display="flex" alignItems="center" justifyContent="center">
                                            <Typography className={classes.editClick} >Edit</Typography>
                                            <FiberManualRecordIcon className={classes.StatusInactiveIcon} />
                                        </Span>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    </Grid>
                </Hidden>
                {/* ........... */}
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(ManageCategories);
