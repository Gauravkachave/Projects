import React,{useState} from 'react'
// import Picker from 'emoji-picker-react';
import Span  from "@material-ui/core/Box";
import { withStyles, Typography, Divider, Grid, FormControl, TextField, MenuItem, Button, IconButton, Menu, FormHelperText, Tooltip,
    Dialog, DialogContent, Paper,  Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Hidden, 
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CloseIcon from '@material-ui/icons/Close';
// import EditImage from "../../assets/EditImage.jpg";

const styles = (theme) =>({
    AddPTemplateTitle:{fontSize:20, fontWeight:'bold'},
    CreateTempBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 39px', fontSize:11, color:'#fb6e8a', marginTop:24},
    textFieldFolder:{fontSize : 12, color: '#2b2b2b',padding:'10px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    textField : { fontSize : 12, color: '#2b2b2b',padding:'12px 13px',background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    cssLabel: {
        color:'#908f8f',
        transform:"translate(14px, 13px) scale(1)",
        fontSize: 13,
    },
    LableShrink:{fontSize:15, transform:'translate(17px, -4px) scale(0.75) !important', color:'#232323'},
    NameInputHelperText:{color:'#636363',marginTop:2},
    textFieldMessage : { fontSize : 12, color: '#2b2b2b',paddingRight:10,background:'#fff','&::placeholder':{color:'#000', fontWeight:500}},
    MessageAllIons:{padding:4, color:'#ffa5b7'},
    MessageAllIonsAttatchment:{padding:4, color:'#ffa5b7', transform: 'rotate(307deg)'},
    MultitlineInput:{paddingTop:10, paddingBottom:40},
    RemaingLetters:{color:'#fb6e8a', fontSize:11, marginRight:15},
    InputIcons:{fontSize:17, color:'#ffa5b7'},
    inputUpload: {display: 'none'},


    //new css
    ToolTipCss:{top:'8px !important'},
    WildcardDropdown:{marginTop:46, marginLeft:50},
    DialogContentPadding:{padding:'0px 15px 15px 15px !important'},
    [theme.breakpoints.only('xs')]: {
        MenuItemLineHeight:{minHeight:30},
        DialogContentPadding:{padding:'10px 15px 15px 15px !important'},
    },
    SavedMedia:{display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:16},
    SavedMediaCloseIcon:{padding:8},
    LatestMediaText:{fontSize:15, fontWeight:400, color:'#3e3e3e'},
    TableHeadCss:{background:'#ebebeb',lineHeight:'6px !important'},
    TableCss:{border:'1px solid #e0e0e0'},
    TableCellHead:{lineHeight:'6px !important', fontSize:12, color:'#585757', fontWeight:'bold'},
    TableCellCss:{padding:'2px 16px', fontSize:12, color:'#585757'},
    AllImages:{width:64, marginTop:6},
    ActionLinks:{color:'#fb6e8a !important'},
    AllLinks:{color:'#fb6e8a', textDecoration:'none', cursor:'pointer'}
})
const FolderValues = [
    {value: 'select_folder',label:'Select Folder'},
    {value: 'texts_to_consultants',label:'Text to Consultants'},
    {value: 'texts_to_customer',label:'Text to Customers'},
    {value: 'texts_to_new_leads',label:'Text to New Leads'},
    {value: 'spanish_texts_to_consultants',label:'Spanish Text to Consultants'},
    {value: 'days_followup',label:'21 Days Follow Up Script'},
];
const CategoryValues = [
    {value: 'select_category',label:'Select Category'},
    {value: 'new_consultant_series',label:'New Consultant Series'},
    {value: 'new_consultant_unit_site',label:'New Consultant w/out Unit Site'},
    {value: 'new_product_info',label:'New Product Info & Company Contests'},
    {value: 'consultant_wishes',label:'Consultant Wishes'},
    {value: 'consultant_status',label:'Consultant Status'},
    {value: 'motivational',label:'Motivational'},
    {value: 'challenges',label:'Challenges'},
    {value: 'canada_status',label:'CANADA - Consultant Status'},
    {value: 'new_promos',label:'New Products & Company Promos'},
    {value: 'monthly_challenges',label:'Monthly Challenges - January'},
    {value: 'prevoius_texts',label:'Previous Texts'},
    {value: 'keywords',label:'Keywords'},
    {value: 'star_countdown',label:'Star Countdown'},
    {value: 'consultant_spanish',label:'Consultant Status Spanish'},
    {value: 'new_consultant_spn',label:'New Consultant SPN'},
    {value: 'consultant_status_sp',label:'Consultant Status SP'},
    {value: 'seasonal',label:'Seasonal'},
    {value: 'covid',label:'Covid 19'},
    {value: 'new_consultant_Twenty',label:'New Consultant 2020'},
    {value: 'nc_texts',label:'NC Texts Sept 2020'},
];

const AddTemplate = (props) => {
const {classes,inputs,errors,onHandleChange,onCreateTemplateBtn} = props;

const [values, setValues] = useState({ PrivateFolder: 'select_folder',PrivateCategory:'select_category'});
const handleChange = name => event => {setValues({ ...values, [name]: event.target.value });};

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleMenu = (event) => {setAnchorEl(event.currentTarget);};
const handleClose = () => {setAnchorEl(null);};

const [chosenEmoji, setChosenEmoji] = useState(null);
const onEmojiClick = (event, emojiObject) => {setChosenEmoji(emojiObject);};

//wildcard section
const [anchorElWildcard, setAnchorElWildcard] = React.useState(null);
const openAnchorElWildcard = Boolean(anchorElWildcard);
const handleWildCardMenu = (event) => {setAnchorElWildcard(event.currentTarget);};
const handleWildCardMenuClose = () => {setAnchorElWildcard(null);};



//media dialog
const [mediaDialog, setMediaDialog] = React.useState(false);

    return (
        <React.Fragment>
            <Span px={4} mt={2}>
                <Typography variant="subtitle2" className={classes.AddPTemplateTitle}>Add  Template</Typography>
                <Span mb={3.7}><Divider/></Span>
                <Grid container direction="row">
                    <Grid item xs={12} sm={10} md={8} lg={6}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        value={values.PrivateFolder}
                                        variant="outlined"
                                        onChange={handleChange('PrivateFolder')}
                                        InputProps={{ classes: {input: classes.textFieldFolder,},}}
                                    >
                                        {FolderValues.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error>{errors['select_folder']}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        value={values.PrivateCategory}
                                        variant="outlined"
                                        onChange={handleChange('PrivateCategory')}
                                        InputProps={{ classes: {input: classes.textFieldFolder,},}}
                                    >
                                        {CategoryValues.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error>{errors['select_category']}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Span mt={3}/>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl fullWidth>
                                <TextField
                                    id="temp_name"
                                    label="Name"
                                    type="text"
                                    variant="outlined"
                                    name='temp_name'
                                    value={inputs['temp_name' || '']}
                                    InputProps={{ classes: {input: classes.textField,},}}
                                    InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                    onChange={event =>{
                                        onHandleChange(
                                            event.target.name,
                                            event.target.value
                                        )
                                    }}
                                />
                                <FormHelperText error>
                                     {errors['temp_name']}
                                     </FormHelperText>
                                <Typography variant="caption" className={classes.NameInputHelperText}>
                                    Give your template a descriptive name that will be used to identify reports and responses.
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Span mt={3}/>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {/* Message input */}
                            <div className={classes.MessageInputContainer}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="temp_message"
                                        label="Message"
                                        type="text"
                                        variant="outlined"
                                        name='temp_message'
                                        value={inputs['temp_message']}
                                        multiline
                                        rows={3}
                                        InputProps={{ classes: {input: classes.textFieldMessage,multiline: classes.MultitlineInput,},}}
                                        InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                        onChange={event =>{
                                            onHandleChange(
                                                event.target.name,
                                                event.target.value
                                            )
                                        }}
                                    />
                                    {/* <FormHelperText error>
                                     {errors['temp_name']}
                                     </FormHelperText> */}
                                    <Typography variant="caption" className={classes.NameInputHelperText}>
                                        Max image file size 5 MB (images only) and 500Kb for other media files. Be sure to do a test send
                                        with all new images.
                                    </Typography>
                                    
                                </FormControl> 
                                <div className="messageInput">
                                    <div>
                                        <Tooltip arrow={true} title="Saved Media" placement="top" classes={{popper:classes.ToolTipCss}}>
                                            <IconButton 
                                                className={classes.MessageAllIons}  
                                                onClick={()=>{setMediaDialog(!mediaDialog)}}
                                            >
                                                <ImageIcon className={classes.InputIcons}/>
                                            </IconButton>
                                        </Tooltip>
                                        {/* Saved Media Dialog */}
                                        <Dialog open={mediaDialog} fullWidth maxWidth="sm">
                                            <DialogContent className={classes.DialogContentPadding}>
                                            <Typography variant="h6" className={classes.SavedMedia}>
                                               <div> Saved Media Files <span className={classes.LatestMediaText}>Showing latest 1 media</span></div>
                                                <IconButton className={classes.SavedMediaCloseIcon} onClick={()=>{setMediaDialog(!mediaDialog)}}><CloseIcon/></IconButton>
                                            </Typography>
                                                <Divider/>
                                                <Span mt={2}>
                                                <TableContainer component={Paper}>
                                                    <Table className={classes.TableCss}>
                                                        <TableHead className={classes.TableHeadCss}>
                                                            <TableRow>
                                                                <TableCell classes={{head:classes.TableCellHead}}>Preview</TableCell>
                                                                <Hidden only="xs">
                                                                    <TableCell classes={{head:classes.TableCellHead}}>Name</TableCell>
                                                                </Hidden>
                                                                <TableCell classes={{head:classes.TableCellHead}}>Date</TableCell>
                                                                <TableCell classes={{head:classes.TableCellHead}}>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell classes={{root:classes.TableCellCss}}>
                                                                     {/* <img className={classes.AllImages} src={EditImage}/> */}
                                                                </TableCell>
                                                                <Hidden only="xs">
                                                                    <TableCell classes={{root:classes.TableCellCss}}>Image Name</TableCell>
                                                                </Hidden>
                                                                <TableCell classes={{root:classes.TableCellCss}}>07-21-2020 14:58:56</TableCell>
                                                                <TableCell classes={{root:classes.TableCellCss}}>
                                                                    <div className={classes.ActionLinks}>
                                                                        <a href="#" className={classes.AllLinks}>Use It</a> | <a href="#" className={classes.AllLinks}>Download</a>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                </Span>
                                            </DialogContent>
                                        </Dialog>
                                        {/* .................. */}
                                         {/* file Upload */}
                                        <input
                                            accept="image/*"
                                            className={classes.inputUpload}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <label htmlFor="contained-button-file">
                                        <Tooltip arrow={true} title="Upload Media" placement="top" classes={{popper:classes.ToolTipCss}}>
                                            <IconButton className={classes.MessageAllIonsAttatchment} component="span">
                                                <AttachmentIcon className={classes.InputIcons}/>
                                            </IconButton>
                                        </Tooltip>
                                        </label>
                                        {/* ............... */}
                                        <Tooltip arrow={true} title="Unsubscribe Info" placement="top" classes={{popper:classes.ToolTipCss}}>
                                            <IconButton className={classes.MessageAllIons}><NotInterestedIcon className={classes.InputIcons}/></IconButton>
                                        </Tooltip>
                                        <Tooltip arrow={true} title="Wildcards" placement="top" classes={{popper:classes.ToolTipCss}}>
                                            <IconButton className={classes.MessageAllIons} onClick={handleWildCardMenu}><PersonAddIcon className={classes.InputIcons}/></IconButton>
                                        </Tooltip>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorElWildcard}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={anchorElWildcard}
                                                onClose={handleWildCardMenuClose}
                                                classes={{paper:classes.WildcardDropdown}}
                                            >
                                                <MenuItem onClick={handleWildCardMenuClose} classes={{root:classes.MenuItemLineHeight}}>
                                                    <Typography variant="caption">Select Wildcard</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={handleWildCardMenuClose} classes={{root:classes.MenuItemLineHeight}}>
                                                    <Typography variant="caption">First Name</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={handleWildCardMenuClose} classes={{root:classes.MenuItemLineHeight}}>
                                                    <Typography variant="caption">Custom Field 1</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={handleWildCardMenuClose} classes={{root:classes.MenuItemLineHeight}}>
                                                    <Typography variant="caption">Custom Field 2</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={handleWildCardMenuClose} classes={{root:classes.MenuItemLineHeight}}>
                                                    <Typography variant="caption">Custom Field 3</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={handleWildCardMenuClose} classes={{root:classes.MenuItemLineHeight}}>
                                                    <Typography variant="caption">Custom Field 4</Typography>
                                                </MenuItem>
                                            </Menu>   
                                        {/* emoji section */}
                                        <Tooltip arrow={true} title="Emoji" placement="top" classes={{popper:classes.ToolTipCss}}>
                                            <IconButton className={classes.MessageAllIons}  onClick={handleMenu}><SentimentSatisfiedOutlinedIcon className={classes.InputIcons}/></IconButton>
                                        </Tooltip>
                                        <div>
                                            <Menu
                                                id="menu-appbar"
                                                    anchorEl={anchorEl}
                                                    anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <div onClick={handleClose}>
                                                    {chosenEmoji ? (
                                                        <span>You chose: {chosenEmoji.emoji}</span>
                                                    ) : (
                                                        <span>No emoji Chosen</span>
                                                    )}
                                                    {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                                    </div>

                                            </Menu>
                                        </div>    
                                        {/* ................ */}
                                    </div>
                                    <Typography variant="caption" className={classes.RemaingLetters}> 600 | 600</Typography>
                                </div>
                                <FormHelperText error>
                                     {errors['temp_message']}
                                     </FormHelperText>
                            </div>
                            {/* ................... */}
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="outlined" className={classes.CreateTempBtn} onClick={onCreateTemplateBtn}>Create Template</Button>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(AddTemplate);
