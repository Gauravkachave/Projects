import React from 'react';
import { withStyles, Button, TableCell, Checkbox} from '@material-ui/core';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const styles = () => ({
    TableCellHead:{lineHeight:'6px !important', fontSize:12, color:'#000000de', fontWeight:500, padding:'4px 14px', textTransform:"uppercase"},
    CheckBoxCSs:{padding:0},
    sortButton:{paddingLeft:'0 !important', paddingRight:'0 !important', fontSize:12, color:'#fb6e8a', '&:hover':{background:"transparent"}}
})
const Thead = (props) => {
    const {classes, align, width, isSortColumn, propAction, columnLabel, sortColumn, stateSortBy, stateOrder, isCheckbox} = props;
    return ( 
        <TableCell align={align} classes={{head:classes.TableCellHead}} width={width}>
            {(isCheckbox)
            ? 
                <Checkbox 
                value="CheckAll"  
                color="default"
                checked={columnLabel}
                onChange={propAction}
                className={classes.CheckBoxCSs}
                size="small"
                />
            :
            <div>
            {(isSortColumn) ?
            <Button variant="text" onClick={propAction} className={classes.sortButton}>
                {columnLabel}
                {   
                    (stateSortBy === sortColumn) 
                    ?
                        (stateOrder === 'ASC')
                        ?<i className="material-icons">expand_less</i>
                        :<i className="material-icons">expand_more</i>
                    :
                    <i className="material-icons">unfold_more</i>
                }
            </Button>
            :
            columnLabel
            }
            </div>
            }
        </TableCell>
    );
}

export default withStyles(styles)(Thead);
