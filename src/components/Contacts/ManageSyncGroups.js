import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Span  from "@material-ui/core/Box";
import { withStyles, Typography, Divider, FormControl, TextField, Button, MenuItem, 
    Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Paper, Checkbox, IconButton, Hidden,
    Grid, Card, CardHeader , Avatar, Collapse, CardContent,CircularProgress
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const styles = (theme) =>({
    GroupTitle:{fontSize:20, fontWeight:'bold'},
    CreateGroupBtn:{borderRadius:50, border:'1px solid #fb6e8a', padding:'6px 15px', fontSize:11, color:'#fb6e8a', marginLeft:5},
    textField:{fontSize : 12, color: '#2b2b2b',padding:'10px 13px',background:'#fff',width:100,'&::placeholder':{color:'#000', fontWeight:500}},
    DeleteBtn:{borderRadius:50, border:'1px solid #ff2828', padding:'8px 15px', fontSize:11, color:'#ff2828'},
    TableHeadCss:{background:'#ebebeb',lineHeight:'6px !important'},
    TableCss:{border:'1px solid #e0e0e0'},
    TableCellHead:{lineHeight:'6px !important', fontSize:12, color:'#585757', fontWeight:'bold', padding:'10px 16px'},
    TableCellCss:{padding:'0px 15px', fontSize:13, color:'#585757'},
    TableCellCssLink:{color:'#fb6e8a', fontSize:13, padding:'0px 15px',},
    ManageFolderBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 39px', fontSize:11, color:'#fb6e8a', marginTop:24, marginBottom:10},
    ActionButns:{background:'#fb6e8a', color:'#fff', minWidth:31, padding:'5px 0px', fontSize:16, margin:'8px 2px'},
    SortingItems:{display:'flex', alignItems:'center', color:'#fb6e8a'},
    SortingIcon:{padding:0, color:'#fb6e8a'},
    CheckBoxCSs:{padding:0},
    
    [theme.breakpoints.only('sm')]: {
        TableCss:{minWidth:"800px"}
    },
    [theme.breakpoints.only('xs')]: {
        ResponsiveView:{display:'grid'},
        ResponsiveInput:{marginTop:8},
        GroupTitle:{fontSize:17,},
        ActionButns:{background:'#fb6e8a', color:'#fff', minWidth:73, padding:'9px 0px', fontSize:16, marginTop:16},
        DeleteBtn:{borderRadius:50, border:'1px solid #ff2828', padding:'8px 15px', fontSize:11, color:'#ff2828', width:'100%'},
    },

    //mobile css
    SubscriberInfo:{fontSize:11, color:'#353535'},
    CardContentPadding:{padding:'0px 23px 12px 23px !important'},
    GroupAvatar:{background:'#fb6e8a', marginLeft:5},


    GroupCard:{marginBottom:15},
    GroupName:{color:'#fb6e8a', cursor:'pointer',fontSize:"12px"},
    CardHeadCss:{alignItems:"flex-start"},
    
})

const PageItemValues = [
    {value: 'items_per_page',label:'Items Per Page'},
    {value: 10,label:10},
    {value: 20,label:25},
    {value: 50,label:50},
];

const ManageSyncGroups = (props) => {
    const {classes,groups,type,perPageChange,perPageValue,loader} = props;
     
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {setExpanded(!expanded)};

    return (
        <React.Fragment>
            <Span px={4} mt={2}>
                <Span display="flex" alignItems="center" justifyContent="space-between" className={classes.ResponsiveView}>
                    <Span display="flex" alignItems="center">
                        <Typography variant="subtitle2" className={classes.GroupTitle}>Manage {type} Groups</Typography>
                        {/* <Button className={classes.CreateGroupBtn} component={Link} to ={`/contacts/create-sync-group`}
                        >Create Group</Button> */}

                            <Button 
                                className={classes.CreateGroupBtn} 
                                component={Link} 
                                to={(type === 'Sync') ? "/contacts/create-sync-group" : "/contacts/create-public-group"}
                            >
                                Create Group
                            </Button>
                    </Span>
                    <FormControl className={classes.ResponsiveInput}>
                            <TextField
                                select
                                value={perPageValue}
                                variant="outlined"
                                onChange={(event) => {
                                perPageChange(event.target.value);
                                }}
                                InputProps={{ classes: {input: classes.textField,},}}
                            >
                                {PageItemValues.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                        </TextField>
                        </FormControl>
                </Span>
                <Span mt={1.9} mb={3.7}><Divider/></Span>
                <Span mt={3}/>
                {/* Main View*/}
                <Hidden only="xs">
                    <TableContainer component={Paper}>
                        <Table className={classes.TableCss}>
                            <TableHead className={classes.TableHeadCss}>
                                <TableRow>
                                    <TableCell classes={{head:classes.TableCellHead}} width="27%">
                                        <div className={classes.SortingItems}>
                                            Group Name
                                            <IconButton className={classes.SortingIcon}><ArrowDropDownIcon/></IconButton>
                                        </div>
                                    </TableCell>
                                    <TableCell classes={{head:classes.TableCellHead}} width="29%">
                                        <div className={classes.SortingItems}>
                                            Date Created
                                            <IconButton className={classes.SortingIcon}><ArrowDropDownIcon/></IconButton>
                                        </div>
                                    </TableCell>
                                    <TableCell classes={{head:classes.TableCellHead}} width="29%">Subscribers</TableCell>
                                    <TableCell classes={{head:classes.TableCellHead}} width="29%">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                {groups && groups.length > 0 ? 
                            groups.map((option,index)=>(
                                <TableRow key={index}>
                                    {
                                    <TableCell 
                                        classes={{root:classes.TableCellCssLink}}>
                                        {option.grp_name}
                                    </TableCell>
                                    }
                                    <TableCell 
                                        classes={{root:classes.TableCellCss}}>
                                        {option.grp_created_on}
                                    </TableCell>
                                    <TableCell 
                                        classes={{root:classes.TableCellCss}}>
                                        {option.cnt_subscribers}
                                    </TableCell>
                                    <TableCell 
                                        classes={{root:classes.TableCellCss}}>
                                            <Button variant="contained" size="small" className={classes.ActionButns} component={Link} to ={`/contacts/edit-sync-groups/${option.grp_id}`}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))  :

                            // <Span >Groups not found</Span>  
                                <TableRow>
                                    <TableCell align="center" colSpan="8">
                                        {loader ? 
                                            <Span align="center">
                                                <CircularProgress size={22} color="secondary" />
                                            </Span>
                                            : 
                                            <Span>Users List not found!</Span>
                                        }
                                    </TableCell>
                                </TableRow>
                            }


                                
                            </TableBody>
                        </Table>
                    </TableContainer>   
                </Hidden>     
                {/* ........ */}
                {/* Mobile View */}
                <Hidden only={['lg', 'md', 'sm', 'xl']}>
                    <Grid container direction='row'>
                        <Grid item xs={12}>
                        <Card className={classes.GroupCard}>
                                <CardHeader className={classes.CardHeadCss}
                                    avatar={
                                        <Span display="flex" alignItems="center">
                                            <Checkbox size='small' color='default' className={classes.CheckBoxCSs} />
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
                                    title={<div className={classes.GroupName}>Group Name : Test Empty</div>}
                                    subheader={<div>Subscribers: 0</div>}
                                />
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent className={classes.CardContentPadding}>
                                        <Span><Divider /></Span>
                                        <Span display="grid" align="center" mt={1}>
                                            <Typography variant="caption" >Date Created : 07:43 AM 08-04-2020</Typography>
                                            <div>
                                                <Button variant="contained" size="small" className={classes.ActionButns}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button variant="contained" size="small" className={classes.ActionButns}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </div>
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

export default withStyles(styles)(ManageSyncGroups);
