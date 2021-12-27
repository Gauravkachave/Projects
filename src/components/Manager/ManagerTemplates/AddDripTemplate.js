import React,{useState} from 'react'
import Picker from 'emoji-picker-react';
import Span  from "@material-ui/core/Box";
import { withStyles, Typography, Divider, Grid, FormControl, TextField, MenuItem, Button, IconButton, Dialog, DialogContent, Menu, FormHelperText } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent} from '@material-ui/lab';
import ImageIcon from '@material-ui/icons/Image';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) =>({
    AddPTemplateTitle:{fontSize:20, fontWeight:'bold'},
    CreateTempBtn:{borderRadius:50, borderColor:'#fb6e8a', padding:'10px 39px', fontSize:11, color:'#fb6e8a'},
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
    MultitlineInput:{paddingTop:10, paddingBottom:40, background:'#fff'},
    RemaingLetters:{color:'#fb6e8a', fontSize:11, marginRight:15},
    InputIcons:{fontSize:17, color:'#ffa5b7'},
    [theme.breakpoints.only('xs')]: {
        DaysBtn:{padding:'10px 41px !important'},
    },
    AddMsgTitle:{display:'flex', alignItems:'center', justifyContent:'space-between'},
    AddIconBtn:{padding:0, color:'#fff', background:'#fb6e8a', '&:hover':{background:'#ffb4c3', color:'#fff'}},
    AddDripMsg:{display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:16},
    DialogContentPadding:{padding:'0px 15px 15px 15px !important'},
    DialogWidth:{maxWidth:515},
    DaysBtn:{padding:'12px 93px', color:'#fff', fontSize:11, background:'#fb6e8a', borderRadius:30, boxShadow:'none !important', marginLeft:6, marginTop:10},
    AllImages:{width:45, marginRight:8, marginTop:4},
    SelectedBtn:{color:'#fb6e8a', background:'#fff', border:'1px solid #fb6e8a'},

    //timeline css
    MissingConentCss:{'&:before': { display: "none"},},
	TimelineDayRangeText:{color:'#fb6e8a', fontSize:12},
	DaysContainer:{padding:'5px 7px'},
	TimelinePadding:{padding:0},
	DaysContent:{padding:0, color:'#353535', fontSize:12},
    TimelineDotCss:{padding:8, border:'none', boxShadow:'none', background:'#fb6e8a', marginTop:7},
    AddBtnDivider:{width:15, height:2, background:'#bdbdbd'},
})

const AddDripTemplate = (props) => {
    const {classes, inputs, errors, selectedFolder, selectedCategory, handleChange, handleSubmit} = props;
    
    const [addDialog, setAddtDialog] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};

    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {setChosenEmoji(emojiObject);};


    return (
        <React.Fragment>
            <Span px={4}>
                <Typography variant="subtitle2" className={classes.AddPTemplateTitle}>Add Private Drip Template</Typography>
                <Span mb={3.7}><Divider/></Span>
                <Grid container direction="row" spacing={3}>
                    {/* Left Section */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        name="folder_id"
                                        value={inputs["folder_id"] || " "}
                                        variant="outlined"
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        InputProps={{ classes: {input: classes.textFieldFolder,},}}
                                    >
                                        <MenuItem value = {0}>Select Folder</MenuItem>
                                        {selectedFolder && selectedFolder.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.folder_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error>{errors["folder_id"] || " "}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        name="cat_id"
                                        value={inputs["cat_id"] || " "}
                                        variant="outlined"
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        InputProps={{ classes: {input: classes.textFieldFolder,},}}
                                    >
                                        <MenuItem value = {0}>Select Category</MenuItem>
                                        {selectedCategory && selectedCategory.map(option => (
                                            <MenuItem key={option.cat_id} value={option.cat_id}>
                                                {option.cat_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error>{errors["cat_id"] || " "}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Span mt={3}/>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name="tmpl_name"
                                    id="tmpl_name"
                                    label="Template Name"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    InputProps={{ classes: {input: classes.textField,},}}
                                    InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                />
                                <Typography variant="caption" className={classes.NameInputHelperText}>
                                     Give your template a descriptive name that will be used to identify reports and responses.
                                </Typography>
                                <FormHelperText error>{errors["tmpl_name"] || " "}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Span mt={3}/>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={classes.MessageInputContainer}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="tmpl_message"
                                        id="tmpl_message"
                                        label="Template Message"
                                        type="text"
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        InputProps={{ classes: {input: classes.textFieldMessage,multiline: classes.MultitlineInput,},}}
                                        InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                                    />
                                    <Typography variant="caption" className={classes.NameInputHelperText}>
                                        Max image file size 5 MB (images only) and 500Kb for other media files. Be sure to do a test send
                                        with all new images.
                                    </Typography>
                                </FormControl> 
                                <div className="messageInput">
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
                                             <div>
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
                                <FormHelperText error>{errors["tmpl_message"] || " "}</FormHelperText>
                            </div>
                        </Grid>
                        <Button variant="outlined" className={classes.CreateTempBtn} onClick={handleSubmit}>Create Template</Button>
                    </Grid>
                    {/* ............ */}
                    {/* Right Section */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography variant="body1" className={classes.AddMsgTitle}>Add Drip Message
                            <IconButton className={classes.AddIconBtn} onClick={()=>{setAddtDialog(!addDialog)}}><AddIcon/></IconButton>
                        </Typography>
                        <Span my={1}><Divider/></Span>
                        <Dialog open={addDialog} fullWidth maxWidth="xs" classes={{paperWidthXs:classes.DialogWidth}}>
                            <DialogContent className={classes.DialogContentPadding}>
                                <Typography variant="h6" className={classes.AddDripMsg}>
                                    Add Drip Message
                                    <IconButton className={classes.AddDripMsgCloseIcon} onClick={()=>{setAddtDialog(!addDialog)}}><CloseIcon/></IconButton>
                                </Typography>
                                <Divider/>
                                <Span bgcolor="#feeef1" mt={2} px={2} py={1}>
                                    <Button 
                                        variant='outlined'
                                        // variant={(SelectedIndex === 1) ? "outlined" : "contained"}
                                        classes={{root:classes.DaysBtn, outlined:classes.SelectedBtn}}
                                        // onClick={ () =>{setSelectedIndex(1)}}
                                    >
                                        Days
                                    </Button>
                                    <Button 
                                        variant='outlined'
                                        // variant={(SelectedIndex === 2) ? "outlined" : "contained"}
                                        classes={{root:classes.DaysBtn, outlined:classes.SelectedBtn}}
                                        // onClick={ () =>{setSelectedIndex(2)}}
                                    >
                                        Hours
                                    </Button>
                                    <Span mt={2}/>
                                    {/* {(SelectedIndex===1) && <AddDay/>} */}
                                    {/* {(SelectedIndex===2) && <AddHours/>} */}
                                  
                                </Span>
                            </DialogContent>
                        </Dialog>
                        <Timeline align="left" classes={{root:classes.TimelinePadding}}>
                            <TimelineItem classes={{missingOppositeContent:classes.MissingConentCss}}>
                                <TimelineSeparator>
                                    <TimelineDot classes={{defaultGrey:classes.TimelineDotCss}}/>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent classes={{root:classes.DaysContainer}}>
                                    <Typography variant="subtitle2" className={classes.TimelineDayRangeText}>Day 1</Typography>
                                    <Span className={classes.DaysContent}>
                                        <Span display="flex" alignItems="center" className={classes.ImageContainer}>
                                        <div>
                                            opposed to using 'Content here, content here', making it look like readabled English. 
                                            Many desktop publishing packages and web page
                                        </div>
                                    </Span>
                                    </Span>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem classes={{missingOppositeContent:classes.MissingConentCss}}>
                                <TimelineSeparator>
                                    <TimelineDot classes={{defaultGrey:classes.TimelineDotCss}}/>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent classes={{root:classes.DaysContainer}}>
                                    <Typography variant="subtitle2" className={classes.TimelineDayRangeText}>Day 1</Typography>
                                    <Span className={classes.DaysContent}>
                                        <Typography variant="caption">
                                            opposed to using 'Content here, content here', making it look like readabled English. 
                                            Many desktop publishing packages and web page
                                        </Typography>
                                    </Span>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem classes={{missingOppositeContent:classes.MissingConentCss}}>
                                <TimelineSeparator>
                                    <TimelineDot classes={{defaultGrey:classes.TimelineDotCss}}/>
                                    <div style={{display:"contents"}}>
                                        <TimelineConnector />
                                        <Divider className={classes.AddBtnDivider}/>
                                    </div>
                                </TimelineSeparator>
                                <TimelineContent classes={{root:classes.DaysContainer}}>
                                     <Typography variant="subtitle2" className={classes.TimelineDayRangeText}>Day 3</Typography>
                                    <Span className={classes.DaysContent}>
                                        <Typography variant="caption">
                                            search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have in  evolved over the years,
                                        </Typography>
                                    </Span>
                                </TimelineContent>
                            </TimelineItem> 
                        </Timeline>
                    </Grid>
                    {/* ............. */}
                </Grid>
            </Span>
        </React.Fragment>
    )
}

export default withStyles(styles)(AddDripTemplate);
