import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import TablePaginationActions from './components/TablePaginationActions';

// TODO: remove this import
import data from './data.json';

const rightBorderStyle = { borderRight: '2px solid #e0e0e0' };
const useStyles = makeStyles({
  tableCellPaddingRight: {
    paddingRight: 2,
    border: '1px solid #e0e0e0',
  },
  tableCellWorkingHour: {
    backgroundColor: '#4dabf5',
  },
  tableCellCurrentHour: {
    backgroundColor: '#e57373 !important',
  }
});

function TimeZones() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();

  const date = new Date();
  const currentHour = date.getHours();
  const offsetHours = (date.getTimezoneOffset() / 60);

  const hours = [...Array(24).keys()];
  const cells = {
    localUtcTime: [],
    withoutHours: [],
  };
  hours.forEach((hour) => {
    const computedClasses = `${classes.tableCellPaddingRight} ${currentHour === hour ? classes.tableCellCurrentHour : ''}`;

    cells.localUtcTime.push(<TableCell key={hour} align="center" className={computedClasses}>{Math.abs(hour + offsetHours)}</TableCell>);
    cells.withoutHours.push(<TableCell key={hour} align="center" className={computedClasses}/>);
  });

  /**
   * Paints work hours cells with the color.
   *
   * @param workingHours
   * @returns {JSX.Element[]}
   */
  const fillWorkingHours = (workingHours) => {
    const filledCells = [...cells.withoutHours];

    workingHours.forEach((item) => {
      for (let i = +item.from; i < +item.to; i++) {
        const computedClasses = `${classes.tableCellPaddingRight} ${currentHour === i ? classes.tableCellCurrentHour : classes.tableCellWorkingHour}`;

        filledCells[i] = <TableCell key={i} align="center" className={computedClasses}>{i}</TableCell>;
      }
    });

    return filledCells;
  };

  return (
    <Container disableGutters={true} maxWidth="xl">
      <Box py={3}>
        <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 650, borderCollapse: 'collapse' }}
            size="small"
          >
            <TableHead>
              <TableRow sx={{ '& th': { borderBottomWidth: 2, borderTopWidth: 0 }, '& th:last-child': { borderRightWidth: 0 } }}>
                <TableCell component="th" scope="row" sx={rightBorderStyle}>Your local UTC time</TableCell>
                {cells.localUtcTime}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
              ).map((person) => (
                <TableRow key={person.name} sx={{ '& td:last-child': { borderRightWidth: 0 } }}>
                  <TableCell component="th" scope="row" sx={rightBorderStyle}>{person.name}</TableCell>
                  {fillWorkingHours(person.working_hours)}
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={hours.length + 1} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default TimeZones;
