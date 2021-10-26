import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';

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
  const classes = useStyles();

  const date = new Date();
  const currentHour = date.getHours();

  const hours = [...Array(24).keys()];
  const cells = {
    utcTime: [],
    localTime: [],
    withoutHours: [],
  };
  hours.forEach((hour) => {
    const computedClasses = `${classes.tableCellPaddingRight} ${currentHour === hour ? classes.tableCellCurrentHour : ''}`;

    cells.utcTime.push(<TableCell key={hour} align="right" className={computedClasses}>{Math.abs(hour + (date.getTimezoneOffset() / 60))}</TableCell>);
    cells.localTime.push(<TableCell key={hour} align="right" className={computedClasses}>{hour}</TableCell>);
    cells.withoutHours.push(<TableCell key={hour} align="right" className={computedClasses}>&nbsp;</TableCell>);
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
        filledCells[i] = <TableCell key={i} align="right" className={`${classes.tableCellPaddingRight} ${classes.tableCellWorkingHour}`}>{i}</TableCell>;
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
                <TableCell component="th" scope="row" sx={rightBorderStyle}>Your local time</TableCell>
                {cells.localTime}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '& td:last-child': { borderRightWidth: 0 } }}>
                <TableCell sx={rightBorderStyle}>UTC time</TableCell>
                {cells.utcTime}
              </TableRow>
              {data.map((person) => (
                <TableRow key={person.name} sx={{ '&:last-child td, &:last-child th': { borderBottomWidth: 0 }, '& td:last-child': { borderRightWidth: 0 } }}>
                  <TableCell component="th" scope="row" sx={rightBorderStyle}>{person.name}</TableCell>
                  {fillWorkingHours(person.working_hours)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default TimeZones;
