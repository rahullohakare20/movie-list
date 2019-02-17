import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';

const list = {
    root: {
        margin: '0 50px'
    },
    table: {
        minWidth: 700,
    },
};

const mainTitle = {
    textAlign:'center',
    padding:'20px',
    fontWeight: 'bold',
    fontSize : "25px"
};

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, rowCount } = this.props;
        const tableHead = {
            backgroundColor: this.props.tableColor,
            color: 'white',
            fontWeight: 'bold'
        };
        const rows = [
            { id: 'movie_title', numeric: false, disablePadding: false, label: 'Movie title' },
            { id: 'director_name', numeric: true, disablePadding: false, label: 'Director name' },
            { id: 'language', numeric: true, disablePadding: false, label: 'Language' },
            { id: 'country', numeric: true  , disablePadding: false, label: 'Country' },
            { id: 'budget', numeric: true, disablePadding: false, label: 'Budget' },
        ];

         return (
            <TableHead style={{border: '5px solid white'}}>
                <TableRow>
                      {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                style={tableHead}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                    style={{color:'white'}}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}


class MovieList extends Component {

    state = {
        order: 'asc',
        orderBy: 'movie_title',
        movielist: [],
        page: 0,
        rowsPerPage: 10,
    };

    componentWillMount() {
        axios.get("movieList.json").then((response) => {
            this.setState({ movielist : response.data });
        });
    }

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.movielist.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { movielist, order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.movielist.length - page * rowsPerPage);
        return (
            <Paper style={list.root}>
                <div style={mainTitle}>Movie List</div>
                <Table style={list.table}>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={movielist.length}
                        tableColor = {this.props.tableColor}
                    />
                    <TableBody>
                        {stableSort(this.state.movielist, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {row.movie_title}
                                </TableCell>
                                <TableCell align="right">{row.director_name}</TableCell>
                                <TableCell align="right">{row.language}</TableCell>
                                <TableCell align="right">{row.country}</TableCell>
                                <TableCell align="right">{row.budget}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.movielist.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

export default MovieList;
