import React, { useState } from 'react';
import Span from "@material-ui/core/Box";
import {
    withStyles, Typography, Divider, Table, TableHead, TableRow, TableBody, TableCell, TableContainer,
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
const FolderValues = [
    { value: 'select_folder', label: 'Select Folder' },
    { value: 'texts_to_consultants', label: 'Text to Consultants' },
    { value: 'texts_to_customer', label: 'Text to Customers' },
    { value: 'texts_to_new_leads', label: 'Text to New Leads' },
    { value: 'spanish_texts_to_consultants', label: 'Spanish Text to Consultants' },
    { value: 'days_followup', label: '21 Days Follow Up Script' },
];
const CategoryValues = [
    { value: 'select_category', label: 'Select Category' },
    { value: 'new_consultant_series', label: 'New Consultant Series' },
    { value: 'new_consultant_unit_site', label: 'New Consultant w/out Unit Site' },
    { value: 'new_product_info', label: 'New Product Info & Company Contests' },
    { value: 'consultant_wishes', label: 'Consultant Wishes' },
    { value: 'consultant_status', label: 'Consultant Status' },
    { value: 'motivational', label: 'Motivational' },
    { value: 'challenges', label: 'Challenges' },
    { value: 'canada_status', label: 'CANADA - Consultant Status' },
    { value: 'new_promos', label: 'New Products & Company Promos' },
    { value: 'monthly_challenges', label: 'Monthly Challenges - January' },
    { value: 'prevoius_texts', label: 'Previous Texts' },
    { value: 'keywords', label: 'Keywords' },
    { value: 'star_countdown', label: 'Star Countdown' },
    { value: 'consultant_spanish', label: 'Consultant Status Spanish' },
    { value: 'new_consultant_spn', label: 'New Consultant SPN' },
    { value: 'consultant_status_sp', label: 'Consultant Status SP' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'covid', label: 'Covid 19' },
    { value: 'new_consultant_Twenty', label: 'New Consultant 2020' },
    { value: 'nc_texts', label: 'NC Texts Sept 2020' },
];

const ManagePrivateTemplate= (props)=> {
    const { classes } = props;
    const [values, setValues] = useState({ Timezone: 'texts_to_consultants', PrivateCategory: 'new_consultant_series' })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => { setExpanded(!expanded) };
    return (
        <React.Fragment>
            <Span px={4} py={3}>
                <Typography variant="subtitle2" className={classes.ManageCategoriesTitle}>
                    Manage Private Templates
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
                                        value={values.Timezone}
                                        variant="outlined"
                                        onChange={handleChange('Timezone')}
                                        InputProps={{ classes: { input: classes.textFieldFolder, }, }}
                                    >
                                        {FolderValues.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error>Error here...</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <Typography variant="caption">Category</Typography>
                                    <TextField
                                        select
                                        value={values.PrivateCategory}
                                        variant="outlined"
                                        onChange={handleChange('PrivateCategory')}
                                        InputProps={{ classes: { input: classes.textFieldFolder, }, }}
                                    >
                                        {CategoryValues.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error>Error here...</FormHelperText>
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
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>Month 2 - Inventory if they have not placed order</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Span display="flex" alignItems="center" className={classes.ImageContainer}>
                                            {/* <div><img className={classes.AllImages} src={EditImage} /></div> */}
                                            <div>
                                                Hurry, before it is too late. I do not want you to miss your last opportunity to receive tons of FREE MK Product as a New Consultant.
                                                This is an important decision, so please contact me and we can discuss what option is best for you. With Excitement and Belief, <a href="#" className={classes.AllLinks}>http://bit.ly/2v4dkcn</a>
                                            </div>
                                        </Span>
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>Day 7 - MKU</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        Your future is bright - I know U have lots of questions. Be patient with yourself and be a good student.
                                        Start on-line training by logging into www.marykayintouch.com and go to MKUniversity.
                                        Let me know when U are done with all the steps so I can get you your SHADES.
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>Day 2 - Get Down to Business w/ WEBSITE</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Span display="flex" alignItems="center" className={classes.ImageContainer}>
                                            {/* <div><img className={classes.AllImages} src={FlowerImage} /></div> */}
                                            <div>
                                                Get your new MK Business off to a great start when you complete the next challenge - Get Down to Business.
                                                I am here to support you in making it both enjoyable and profitable. Click below for your next steps and to
                                                earn another gift. Cheering you on, (www.websiteaddress.com)
                                            </div>
                                        </Span>
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>Day 0 - Beat the Box w/ WEBSITE</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        Hello, this is ______, your MK Director. I want to congratulate you on your new business journey.
                                        Complete the Beat the Box challenge and receive a gift. Click below. Call or text me at _________ and we can set a time to chat.
                                        With Joy, (www.websiteaddress.com)
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>Day 1 - Join FB</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        We are so excited to have you as part of our group, please join our Facebook Private group to get the latest news,
                                        upcoming events, recognition and training. CLICK BELOW to join, then click on the JOIN Button. xoxo
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>Day 2 Get Down to Busines</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        Get your new MK Business off to a great start when you complete the next challenge - Get Down to Business.
                                        I am here to support you in making it both enjoyable and profitable. Click below for your next steps and to earn another gift.
                                        Cheering you on, <a href="#" className={classes.AllLinks}>http://bit.ly/2v9yrtC</a>
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>Day 0 - Beat the Box</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        Hello, this is ______, your MK Director. I want to congratulate you on your new business journey.
                                        Complete the Beat the Box challenge and you will receive a gift. Click below.
                                        Call or text me at _________ and we can set a time to chat. With Joy, <a href="#" className={classes.AllLinks}>http://bit.ly/2Lpkl29</a>
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell classes={{ root: classes.TableCellCss }}>Day 14 - Booking Tips</TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        Booking appointments is the lifeline to your new business. Here are the magic words to booking your
                                        appointments. <a href="#" className={classes.AllLinks}>http://bit.ly/2D7NGtG</a>
                                    </TableCell>
                                    <TableCell classes={{ root: classes.TableCellCss }}>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Hidden>
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
                                    title={<div className={classes.GroupName}>Name : Day 7 - MKU</div>}
                                />
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent className={classes.CardContentPadding}>
                                        <Span><Divider /></Span>
                                        <Span display="flex" alignItems="center" justifyContent="center" mt={1}>
                                            <Span display="flex" alignItems="center" className={classes.ImageContainer}>
                                                {/* <div><img className={classes.AllImages} src={EditImage} /></div> */}
                                                <div>
                                                    Hurry, before it is too late. I do not want you to miss your last opportunity to receive tons of FREE MK Product as a New Consultant.
                                                    This is an important decision, so please contact me and we can discuss what option is best for you. With Excitement and Belief, <a href="#" className={classes.AllLinks}>http://bit.ly/2v4dkcn</a>
                                                </div>
                                            </Span>
                                        </Span>
                                        <Span display="flex" justifyContent="center">
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="contained" size="small" className={classes.ActionButns}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
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

export default withStyles(styles)(ManagePrivateTemplate);
