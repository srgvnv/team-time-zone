import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

// TODO: remove this import
import data from './data.json';

const useStyles = makeStyles({
  tableCell: {
    paddingRight: 2,
  }
});

function TimeZones() {
  const classes = useStyles();

  const hours = [...Array(24).keys()];
  const cellsWithHours = hours.map((hour) => <TableCell key={hour} align="right" className={classes.tableCell}>{hour}</TableCell>);

  return (
    <Container fixed>
      <Box py={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>UTC time</TableCell>
                {cellsWithHours}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Your local time</TableCell>
                {cellsWithHours}
              </TableRow>
              {data.map((person) => (
                <TableRow key={person.name}>
                  <TableCell component="th" scope="row">{person.name}</TableCell>
                  {cellsWithHours}
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
