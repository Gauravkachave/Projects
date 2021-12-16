import React,{useState} from 'react'
import Picker from 'emoji-picker-react';
import Span  from "@material-ui/core/Box";
import Circularloader from '../../../helper/loaders/CircularLoader';
import { withStyles, Typography, Divider, Grid, FormControl, TextField, MenuItem, Button, IconButton, Menu,FormHelperText } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const styles = (theme) =>({
    AddPTemplateTitle:{fontSize:20, fontWeight:'bold'},
    UpdateTempBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 39px', fontSize:11, color:'#fb6e8a', marginTop:24},
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
    DaysBtn:{padding:'12px 93px', color:'#fff', fontSize:11, background:'#fb6e8a', borderRadius:30, boxShadow:'none !important', marginLeft:6, marginTop:10},
    SelectedBtn:{color:'#fb6e8a', background:'#fff', border:'1px solid #fb6e8a'},
  
    [theme.breakpoints.only('xs')]: {
        EditDeleteBtn:{marginRight:48},
        DaysBtn:{padding:'10px 41px !important'},
    },
    [theme.breakpoints.only('md')]: {
        EditDeleteBtn:{marginRight:48}
    },
    SelectedEditBtn:{border:'1px solid #fb6e8a', background:'#fff !important', color:'#fb6e8a !important'},

    EditImage:{width:96},
    //Timeline css
    MissingConentCss:{'&:before': { display: "none"},},
	TimelineDayRangeText:{color:'#fb6e8a', fontSize:12},
	DaysContainer:{padding:'5px 7px'},
	TimelinePadding:{padding:0, marginTop:-10},
	DaysContent:{borderRadius:5, background:'#feeef1', padding:'8px 12px', color:'#353535', fontSize:12, marginTop:4, maxWidth:500,},
	TimelineDotCss:{padding:8, border:'none', boxShadow:'none', background:'#fb6e8a', marginTop:10},
	DayAndBtnCss:{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:527,},
	TimelineBtns:{
		boxShadow:'none', padding:'5px 6px', margin:'0px 3px', fontSize:15, color:'#8f8989', background:'#feeef1', minWidth:30,
		'&:hover':{boxShadow:'none', background:'#fff', color:'#fb6e8a'}
	},
	DateText:{fontStyle:'italic', color:'#7b7b7b', float:'right'},
	DayAndAddBtn:{display:'flex', alignItems:'center',},
	AddBtnContainer:{display:'flex', alignItems:'center', marginTop:-17},
	AddBtnDivider:{width:15, height:2, background:'#bdbdbd'},
	AddBtn:{
		boxShadow:'none', padding:'6px 6px',fontSize:15, color:'#8f8989', background:'#feeef1', minWidth:30, borderRadius:'50%',
		'&:hover':{boxShadow:'none', background:'#fff', color:'#fb6e8a'}
	},
})

const EditNormalTemplate = (props) =>{
const {classes,inputs,errors,handleChange,btnLoader,
    folderList,categoryList,onUpdateBtn} = props;

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleMenu = (event) => {setAnchorEl(event.currentTarget);};
const handleClose = () => {setAnchorEl(null);};

const [chosenEmoji, setChosenEmoji] = useState(null);
const onEmojiClick = (event, emojiObject) => {setChosenEmoji(emojiObject);};

const [expanded, setExpanded] = React.useState(false);

const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return (
        <React.Fragment>
            <Span px={4}>
                <Typography variant="subtitle2" className={classes.AddPTemplateTitle}>Normal Template Edit</Typography>
                <Span mb={3.7}><Divider/></Span>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        name="folder_id"
                                        value={inputs['folder_id'] || ''}
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
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.folder_name}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                <TextField
                                        select
                                        name="cat_id"
                                        value={inputs['cat_id'] || ''}
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
                                        {categoryList &&  categoryList.map((option) => (
                                            <MenuItem key={option.cat_id} value={option.cat_id}>
                                                {option.cat_name}
                                            </MenuItem>
                                        ))
                                        }
                                    </TextField>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Span mt={3}/>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl fullWidth>
                            <TextField
                                id="tmpl_name"
                                label="Template Name"
                                type="text"
                                variant="outlined"
                                name='tmpl_name'
                                InputProps={{ classes: {input: classes.textField,},}} 
                                InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                value={inputs['tmpl_name'] || ''}
                                onChange={(event) => {
                                    handleChange(
                                        event.target.name,
                                        event.target.value
                                    );
                                }}
                            />
                            <FormHelperText error>{errors['tmpl_name']}</FormHelperText>
                                <Typography variant="caption" className={classes.NameInputHelperText}>
                                    Give your template a descriptive name that will be used to identify reports and responses.
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Span mt={3}/>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={classes.MessageInputContainer}>
                                <FormControl fullWidth>
                                    <TextField
                                        name='tmpl_message'
                                        id="tmpl_message"
                                        label="Message"
                                        type="text"
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        value={inputs['tmpl_message'] || ''}
                                        InputProps={{ classes: {input: classes.textFieldMessage,multiline: classes.MultitlineInput,},}}
                                        InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                        onChange={(event) => {
                                            handleChange(
                                                event.target.name,
                                                event.target.value
                                            );
                                        }}
                                        
                                    />
                                    <FormHelperText error>{errors['tmpl_message']}</FormHelperText>
                                    <Typography variant="caption" className={classes.NameInputHelperText}>
                                        Max image file size 5 MB (images only) and 500Kb for other media files. Be sure to do a test send
                                        with all new images.
                                    </Typography>
                                </FormControl> 
                                <div  className="messageInput">
                                    <div>
                                        <IconButton className={classes.MessageAllIons}><ImageIcon className={classes.InputIcons}/></IconButton>
                                        <IconButton className={classes.MessageAllIonsAttatchment}>
                                            <AttachmentIcon className={classes.InputIcons}/>
                                        </IconButton>
                                        <IconButton className={classes.MessageAllIons}><NotInterestedIcon className={classes.InputIcons}/></IconButton>
                                        <IconButton className={classes.MessageAllIons}><PersonAddIcon className={classes.InputIcons}/></IconButton>
                                        <IconButton className={classes.MessageAllIons}  onClick={handleMenu}><SentimentSatisfiedOutlinedIcon className={classes.InputIcons}/></IconButton>
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
                                                    <Picker onEmojiClick={onEmojiClick} />
                                                    </div>
                                            </Menu>
                                        </div> 
                                    </div>
                                    <Typography variant="caption" className={classes.RemaingLetters}> 600 | 600</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Button variant="outlined" className={classes.UpdateTempBtn} onClick={onUpdateBtn}>
                            Update Template
                            </Button>                  
                    </Grid>
                </Grid>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(EditNormalTemplate);
