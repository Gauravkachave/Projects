import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Span from "@material-ui/core/Box";
import {
    withStyles, Typography, Divider, Table, TableHead, TableRow, TableBody, TableCell, TableContainer,CircularProgress,
    Paper, FormControl, TextField, Grid, Button, MenuItem, FormHelperText, Hidden, Card, CardContent, CardHeader, Avatar, Collapse, IconButton
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
const styles = (theme) => ({
    ManageCategoriesTitle: { fontSize: 20, fontWeight: 'bold' },
    textFieldFolder: { fontSize: 12, color: '#2b2b2b', padding: '10px 13px', background: '#fff', '&::placeholder': { color: '#000', fontWeight: 500 } },
    TableHeadCss: { background: '#ebebeb', lineHeight: '6px !important' },
    TableCss: { border: '1px solid #e0e0e0' },
    TableCellHead: { lineHeight: '6px !important', fontSize: 12, color: '#585757', fontWeight: 'bold' },
    TableCellCss: { padding: '8px 16px', fontSize: 13, color: '#585757' },
    ManageFolderBtn: { borderRadius: 50, borderColor: '#fb6e8a', padding: '10px 39px', fontSize: 11, color: '#fb6e8a', marginTop: 24, marginBottom: 10 },
    ActionButns: { background: '#fb6e8a', color: '#fff', minWidth: 31, padding: '5px 0px', fontSize: 16, margin: '8px 2px' },
    AllLinks: { color: '#fb6e8a', textDecoration: 'none', cursor: 'pointer' },
    AllImages: { width: 60, marginRight: 10, marginTop: 4 },
    [theme.breakpoints.only('xs')]: {
        ImageContainer: { display: 'grid' }
    },
    //mobile css
    SubscriberInfo: { fontSize: 11, color: '#353535' },
    CardContentPadding: { padding: '0px 23px 12px 23px !important' },
    GroupAvatar: { background: '#fb6e8a', marginLeft: 5 },
    GroupCard: { marginBottom: 15 },
    GroupName: { cursor: 'pointer', fontSize: "12px",marginTop:"12px"},
    CardHeadCss: { alignItems: "flex-start" },
})

const ManagePrivateTemplate= (props)=> {
    const { classes, inputs, folderList, categoryList, contentLoader,handleChange,templateList
        ,folderId,catId
    } = props;

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => { setExpanded(!expanded) };
    return (
        <React.Fragment>
            <Span px={4} py={3}>
                <Typography variant="subtitle2" className={classes.ManageCategoriesTitle}>
                    Manage Templates
                </Typography>
                <Span mb={3.7}><Divider /></Span>
                <Grid container direction="row">
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <Typography variant="caption">Folder</Typography>
                                    <TextField
                                        select
                                        name="folder_id"
                                        value={folderId || ''}
                                        variant="outlined"
                                        onChange={event =>{
                                            handleChange(
                                                event.target.name,
                                                event.target.value
                                            )
                                        }}
                                        InputProps={{ classes: { input: classes.textFieldFolder, }, }}
                                    >
                                        <MenuItem value='0'>
                                        Select Folder
                                        </MenuItem>

                                       {folderList && folderList.map(option => (
                                            (option.folder_state === 'A') &&
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.folder_name}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <Typography variant="caption">Category</Typography>
                                    <TextField
                                        select
                                        name="cat_id"
                                        value={catId || ''}
                                        variant="outlined"
                                        onChange={event =>{
                                            handleChange(
                                                event.target.name,
                                                event.target.value
                                            )
                                        }}
                                        InputProps={{ classes: { input: classes.textFieldFolder, }, }}
                                    >
                                        <MenuItem value='0'>
                                        Select Category
                                        </MenuItem>
                                        {categoryList && categoryList.map(option => (
                                        <MenuItem key={option.cat_id} value={option.cat_id}>
                                            {option.cat_name}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Span mt={3} />
                <Hidden only={['xs']}>
                    <TableContainer component={Paper}>
                        <Table className={classes.TableCss}>
                            <TableHead className={classes.TableHeadCss}>
                                <TableRow>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="21%">Name</TableCell>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="70%">Message</TableCell>
                                    <TableCell classes={{ head: classes.TableCellHead }} width="15%">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(templateList && templateList.length > 0)  ? 
                                templateList.map((option,index)=>(
                                <TableRow key={index}>
                                    <TableCell classes={{ root: classes.TableCellCss }}>{option.tmpl_name}</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>{option.tmpl_message}</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>

                                        <Button variant="contained" size="small" className={classes.ActionButns} component={Link} to ={`/manager/edit-normal-template/${option.tmpl_id}`} >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
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
                                 <Span>Data Not Found.</Span>
                             }
                             </TableCell>
                         </TableRow>
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Hidden>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(ManagePrivateTemplate);


