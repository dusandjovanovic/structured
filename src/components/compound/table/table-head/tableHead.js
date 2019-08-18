import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";

class tableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {
            rows,
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                            color="primary"
                        />
                    </TableCell>
                    {rows.map(row => (
                        <TableCell
                            key={row.id}
                            padding={row.disablePadding ? "none" : "default"}
                            sortDirection={orderBy === row.id ? order : false}
                        >
                            <Tooltip
                                title="Sort"
                                placement={
                                    row.numeric ? "bottom-end" : "bottom-start"
                                }
                                enterDelay={300}
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
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

tableHead.propTypes = {
    rows: PropTypes.array.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default tableHead;
