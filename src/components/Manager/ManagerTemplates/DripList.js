import React,{useState} from 'react'
import Picker from 'emoji-picker-react';
import Span  from "@material-ui/core/Box";
import { withStyles, Typography, Divider, ButtonGroup, Grid, FormControl, TextField, MenuItem, Button, IconButton, Dialog, DialogContent, Menu, FormHelperText } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const styles = (theme) =>({
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
    SubmitBtn:{padding:'12px 95px', color:'#fb6e8a', fontSize:11, background:'#fff !important', borderRadius:30, boxShadow:'none !important', marginLeft:5, border:'1px solid #fb6e8a'},
    EditImage:{width:96},
    DaysBtn:{padding:'12px 93px', color:'#fff', fontSize:11, background:'#fb6e8a', borderRadius:30, boxShadow:'none !important', marginLeft:6, marginTop:10},
    SelectedBtn:{color:'#fb6e8a', background:'#fff', border:'1px solid #fb6e8a'},
    [theme.breakpoints.only('xs')]: {
        DaysBtn:{padding:'10px 41px !important'},
    },
    ErrorText:{margin:'-20px 0px 23px 0px !important'},

    BtnContainer:{border:'1px solid #fb6e8a'},
    ContainedBtn:{boxShadow:'none',background:'#fb6e8a', padding:'12px 65px', fontSize:12, color:'#fff','&:hover':{background:'#ffa6b8',boxShadow:'none'}},
    OutlinedBtn:{border:'none !important', background:'#fff', padding:'12px 65px', color:'#d0d0d0', fontSize:12,'&:hover':{background:'transparent'}}
})

const HoursValues = [
{value: 'hours',label:'Hours'},
{value: 'one',label:'1'},
{value: 'tow',label:'2'},
{value: 'three',label:'3'},
{value: 'four',label:'4'},
{value: 'five',label:'5'},
{value: 'six',label:'6'},
{value: 'seven',label:'7'},
{value: 'eight',label:'8'},
{value: 'nine',label:'9'},
{value: 'ten',label:'10'},
{value: 'eleven',label:'11'},
{value: 'twelve',label:'12'},
];
const MinValues = [
{value: 'minutes',label:'Minutes'},
{value: 'hours_min',label:'00'},
{value: 'one',label:'01'},
{value: 'tow',label:'02'},
{value: 'three',label:'03'},
{value: 'four',label:'04'},
{value: 'five',label:'05'},
{value: 'six',label:'06'},
{value: 'seven',label:'07'},
{value: 'eight',label:'08'},
{value: 'nine',label:'09'},
{value: 'ten',label:'10'},
{value: 'eleven',label:'11'},
{value: 'twelve',label:'12'},
{value: 'thirteen',label:'13'},
{value: 'foureen',label:'14'},
{value: 'fifteen',label:'15'},
{value: 'sixteen',label:'16'},
{value: 'seventeen',label:'17'},
{value: 'eightteen',label:'18'},
{value: 'nineteen',label:'19'},
{value: 'twenty',label:'20'},
{value: 'twenty_one',label:'21'},
{value: 'twenty_two',label:'22'},
{value: 'twenty_three',label:'23'},
{value: 'twenty_four',label:'24'},
{value: 'twenty_five',label:'25'},
{value: 'twenty_six',label:'26'},
{value: 'twenty_seven',label:'27'},
{value: 'twenty_eight',label:'28'},
{value: 'twenty_nine',label:'29'},
{value: 'thirty',label:'30'},
{value: 'twenty_one',label:'31'},
{value: 'thirty_two',label:'32'},
{value: 'thirty_three',label:'33'},
{value: 'thirty_four',label:'34'},
{value: 'thirty_five',label:'35'},
{value: 'thirty_six',label:'36'},
{value: 'thirty_seven',label:'37'},
{value: 'thirty_eight',label:'38'},
{value: 'thirty_nine',label:'39'},
{value: 'fourty',label:'40'},
{value: 'fourty_one',label:'41'},
{value: 'fourty_two',label:'42'},
{value: 'fourty_three',label:'43'},
{value: 'fourty_four',label:'44'},
{value: 'fourty_five',label:'45'},
{value: 'fourty_six',label:'46'},
{value: 'fourty_seven',label:'47'},
{value: 'fourty_eight',label:'48'},
{value: 'fourty_nine',label:'49'},
{value: 'fifty',label:'50'},
{value: 'fifty_one',label:'51'},
{value: 'fifty_two',label:'52'},
{value: 'fifty_three',label:'53'},
{value: 'fifty_four',label:'54'},
{value: 'fifty_five',label:'55'},
{value: 'fifty_six',label:'56'},
{value: 'fifty_seven',label:'57'},
{value: 'fifty_eight',label:'58'},
{value: 'fifty_nine',label:'59'},
];
const AmPmValues = [
{value: 'am',label:'AM'},
{value: 'pm',label:'PM'},
]
const DripItem = (props) => {
    const {classes, dripType} = props;
    const [values, setValues] = useState({
        SelectHours:'three', 
        SelectMins:'thirty', 
        SelectAmPm:'am'
    });

    // const handleChange = name => event => {setValues({ ...values, [name]: event.target.value });};

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};

    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {setChosenEmoji(emojiObject);};
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        let isError ='' ;
        fields[field] = value;
        errors[field] = isError ? isError : '';

        setFields({ ...fields});
        setErrors({ ...errors});

    }

    
    const handleValidation = () => {
        let formIsValid = true;
        let errorData = ['days', 'hours', 'minutes', 'am', 'message'];
        let  errorDataHrs = [ 'hours', 'minutes', 'message'];
        if(dripType ==="DAY"){
        errorData.forEach((val) => {
            if(!fields[val] || !fields[val].trim()){
                formIsValid = false;
                errors[val] = 'This field is requried';
            }
        });
    }else  if(dripType ==="HOUR"){
        errorDataHrs.forEach((val) => {
            if(!fields[val] || !fields[val].trim()){
                formIsValid = false;
                errors[val] = 'This field is requried';
            }
        });
    }
        setErrors({ ...errors});
        return formIsValid;
    }

    const handleSubmit = () => {
        if(handleValidation()){
            console.log(fields);
        }
    }

    return (
        <React.Fragment>
            <Span my={2} ml={-0.6}>
            {/* <Button 
                // variant={(SelectedIndex === 1) ? "outlined" : "contained"}
                classes={{root:classes.DaysBtn, outlined:classes.SelectedBtn}}
                // onClick={ () =>{setSelectedIndex(1)}}
            >
                Days
            </Button>
            <Button 
                    variant="outlined"
                classes={{root:classes.DaysBtn, outlined:classes.SelectedBtn}}
                // onClick={ () =>{setSelectedIndex(2)}}
            >
                Hours
            </Button> */}
            </Span>
           
            {dripType === 'DAY' && <Grid container direction="row" spacing={1} >
               
                 
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl fullWidth>
                            <TextField
                                name='days'
                                id="days"
                                label="Days"
                                placeholder="Days"
                                type="text"
                                value={fields["days"] || ""}
                                variant="outlined"
                                onChange={(e) => handleChange(e.target.name,e.target.value)}
                                InputProps={{ classes: {input: classes.textField,},}}
                                InputLabelProps={{classes:{outlined:classes.cssLabel,shrink:classes.LableShrink}}}
                            />
                            <Typography variant="caption" className={classes.NameInputHelperText}>
                                This value should be greater than 0
                            </Typography>
                            <FormHelperText error> {errors["days"] || ""}</FormHelperText>
                        </FormControl>
                    </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="caption">Set Send Time</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            name='hours'
                            value={fields["hours"] || "hours"}
                            variant="outlined"
                            onChange={(e) => handleChange(e.target.name,e.target.value)}
                            InputProps={{ classes: {input: classes.textFieldFolder,},}}
                        >
                            {HoursValues.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText error> {errors["hours"] || ""}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            name='minutes'
                            value={fields["minutes"] || "minutes" }
                            variant="outlined"
                            onChange={(e) => handleChange(e.target.name,e.target.value)}
                            InputProps={{ classes: {input: classes.textFieldFolder,},}}
                        >
                            {MinValues.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> 
                        <FormHelperText error> {errors["minutes"] || ""}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            name="am"
                            value={fields["am"] || "am"}
                            variant="outlined"
                            onChange={(e) => handleChange(e.target.name,e.target.value)}
                            InputProps={{ classes: {input: classes.textFieldFolder,},}}
                        >
                            {AmPmValues.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Grid>
                
            </Grid> } 
            
            {dripType === 'HOUR' && <Grid container direction='row' spacing={1}>
                
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="caption">Duration Hrs/Min</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <FormControl fullWidth>
                        <TextField
                        select
                        name='hours'
                        value={fields["hours"] || "hours"}
                        variant="outlined"
                        onChange={(e) => handleChange(e.target.name,e.target.value)}
                        InputProps={{ classes: {input: classes.textFieldFolder,},}}
                    >
                        {HoursValues.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormHelperText error> {errors["hours"] || ""}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <FormControl fullWidth>
                    <TextField
                            select
                            name='minutes'
                            value={fields["minutes"] || "minutes" }
                            variant="outlined"
                            onChange={(e) => handleChange(e.target.name,e.target.value)}
                            InputProps={{ classes: {input: classes.textFieldFolder,},}}
                        >
                            {MinValues.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> 
                    <FormHelperText error> {errors["minutes"] || ""}</FormHelperText>
                    </FormControl>
                </Grid>
               
            </Grid>}
            <Grid container direction='row'>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className={classes.MessageInputContainer}>
                    <Span mt={2}/>
                    <FormControl fullWidth>
                        <TextField
                            name='message'
                            id="message"
                            label="Message"
                            type="text"
                            variant="outlined"
                            value={fields["message"] || " "}
                            multiline
                            rows={3}
                            onChange={(e) => handleChange(e.target.name,e.target.value)}
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
                        <FormHelperText error className={classes.ErrorText}>
                        {errors["message"] || ""}
                        </FormHelperText>
                </div>
                </Grid>
            </Grid>
            <Button variant="contained" className={classes.SubmitBtn} onClick={handleSubmit} >Submit</Button>
        </React.Fragment>
    )
}

export default withStyles(styles)(DripItem);
