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
import TeamSelect from './components/TeamSelect';

// TODO: remove this import
import data from './data.json';
import users from '../../users.json';

const rightBorderStyle = { borderRight: '2px solid #e0e0e0' };
const useStyles = makeStyles({
  tableCellPaddingRight: {
    paddingRight: 2,
    border: '1px solid #e0e0e0',
  },
  tableCellWorkingHour: {
    backgroundColor: '#bbdefb',
  },
  tableCellCurrentHour: {
    backgroundColor: '#66bb6a !important',
  }
});

function mapUsersToWorkHours(users) {
    const workHours = [
        [
            {
                'from': '10',
                'to': '18'
            }
        ],
        [
            {
                'from': '11',
                'to': '13'
            },
            {
                'from': '15',
                'to': '20'
            }
        ],
        [
            {
                'from': '8',
                'to': '16'
            }
        ],
        [
            {
                'from': '14',
                'to': '22'
            }
        ],
        [
            {
                'from': '8',
                'to': '12'
            },
            {
                'from': '15',
                'to': '19'
            }
        ],
    ];

    return users.map((user) => ({
        name: user.real_name,
        //working_hours: workHours[Math.floor(Math.random() * workHours.length)],
        working_hours: getWorkingHours(user)
    }));
}

function getWorkingHours(user) {
    let workingHours = []

    let from = 24 - 11 - user.tz_offset / 60 / 60
    let to = 24 - 3 - user.tz_offset / 60 / 60
    let to2 = 0

    if (to > 23) {
        to2 = to - 24
        to = 24
    }

    if (to2 > 0) {
        workingHours.push(
            {
                'from': 0,
                'to': to2
            }
        )
    }

    workingHours.push(
        {
            'from': from,
            'to': to
        }
    )

    return workingHours
}

function TimeZones(props) {
    const [persons, setPersons] = useState(props.users.length ? mapUsersToWorkHours(props.users.map(userId => users.find(user => user.id === userId))) : data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - persons.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();

    const highest = arr => {
        let result = {};

        (arr || []).map( number => {
            if (result[number]) {
                result[number]++
            } else {
                result[number] = 1
            }
        })

        const sorted = Object.keys(result).sort((a, b) => result[a] - result[b])

        let max = +sorted[sorted.length-1]

        for (let i = 10; i > 0; i--) {
            if (max === 24 && result[24] === result[i]) {
                max = i
            }
        }

        return max
    }

    const allHours = []
    persons.map(person => person.working_hours.map(working_hour => {
        for (let i = +working_hour.from; i <= +working_hour.to; i++) {
            allHours.push(i)
        }
    }))
    const currentHour = highest(allHours) // date.getHours();

    const hours = [...Array(24).keys(), 0];

  const cells = {
    localUtcTime: [],
  };
  hours.forEach((hour, i) => {
    const computedClasses = `${classes.tableCellPaddingRight} ${currentHour === hour ? classes.tableCellCurrentHour : ''}`;

    cells.localUtcTime.push(<TableCell key={hour+Math.random()} align="center" className={computedClasses}>{Math.abs(hour)}:00</TableCell>);
  });

  /**
   * Paints work hours cells with the color.
   *
   * @param workingHours
   * @returns {JSX.Element[]}
   */
  const fillWorkingHours = (workingHours) => {
    const filledCells = [];

    for (let i = 0; i <= 24; i++) {
        if (workingHours.find(workingHour => i >= +workingHour.from && i <= +workingHour.to)) {
            filledCells[i] = <TableCell key={i+Math.random()} align="center" className={
                `${classes.tableCellPaddingRight} ${classes.tableCellWorkingHour} ${currentHour === i && classes.tableCellCurrentHour}`}>{i === 24 ? 0 : i}:00</TableCell>;
        } else {
            filledCells[i] = <TableCell key={i+Math.random()} align="center" className={`${classes.tableCellPaddingRight} ${currentHour === i && classes.tableCellCurrentHour}`}/>
        }
        // чаще встречается последняя i - tableCellCurrentHour
    }

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
                <TableCell component="th" scope="row" sx={rightBorderStyle}>Local Time</TableCell>
                {cells.localUtcTime}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                  ? persons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : persons
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
                  rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                  count={persons.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage='Users per page'
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'users per page',
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
      {/*<TeamSelect setPersons={setPersons}/>*/}
    </Container>
  );
}

export default TimeZones;
