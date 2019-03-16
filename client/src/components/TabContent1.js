import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
    listButton: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});
  

class TablePaginationActions extends React.Component{
    constructor(props){
        super(props);
    }
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
      };
    
      handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
      };
    
      handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
      };
    
      handleLastPageButtonClick = event => {
        this.props.onChangePage(
          event,
          Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
      };
    render(){
    const { classes, count, page, rowsPerPage, theme } = this.props;
        return(
            <div className={classes.listButton}>
                <IconButton
                onClick={this.handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
                >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                onClick={this.handleBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
                >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                onClick={this.handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
                >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                onClick={this.handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
                >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            
            </div>
        );
    }
}


const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
TablePaginationActions,
);


let counter = 0;
function createData(name, calories, fat) {
counter += 1;
return { id: counter, name, calories, fat };
}

const styles = theme => ({
    list: {
        marginTop: theme.spacing.unit * 3,
        marginLeft : 20,
        marginRight : 20,
    },
    table: {
        minWidth: 500,
    },

    tableWrapper: {
        overflowX: 'auto',
    },
    row: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
  },
});

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

class TabContent0 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rows: [
              createData('Cupcake', 305, 3.7),
              createData('Donut', 452, 25.0),
              createData('Eclair', 262, 16.0),
              createData('Frozen yoghurt', 159, 6.0),
              createData('Gingerbread', 356, 16.0),
              createData('Honeycomb', 408, 3.2),
              createData('Ice cream sandwich', 237, 9.0),
              createData('Jelly Bean', 375, 0.0),
              createData('KitKat', 518, 26.0),
              createData('Lollipop', 392, 0.2),
              createData('Marshmallow', 318, 0),
              createData('Nougat', 360, 19.0),
              createData('Oreo', 437, 18.0),
            ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
          };
        
    }
    
    handleChangePage = (event, page) => {
      this.setState({ page });
    };
  
    handleChangeRowsPerPage = event => {
      this.setState({ page: 0, rowsPerPage: event.target.value });
    };
  
    render() {
      const { classes } = this.props;
      const { rows, rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
      return (
        <Paper className={classes.list}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <CustomTableCell>Dessert (100g serving)</CustomTableCell>
                    <CustomTableCell align="left">Calories</CustomTableCell>
                    <CustomTableCell align="left">Fat (g)</CustomTableCell>
                </TableRow>
            </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow className={classes.row} key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.calories}</TableCell>
                    <TableCell align="left">{row.fat}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      );
    }
  }
  
export default withStyles(styles)(TabContent0);