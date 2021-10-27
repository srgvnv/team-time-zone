import { useState } from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import teams from '../../../teams.json';
import users from '../../../users.json';

// TODO: replace with real values
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
    working_hours: workHours[Math.floor(Math.random() * workHours.length)],
  }));
}

function TeamSelect(props) {
  const [team, setTeam] = useState(null);
  const [teamUsers, setTeamUsers] = useState(null);

  const handleTeamChange = (event) => {
    setTeam(teams.find(item => item.id === event.target.value));
  };

  const handleTeamSubmit = () => {
    setTeamUsers(team.users.map((userId) => users.find(user => user.id === userId)));
  };

  const handleTeamDisplay = () => {
    props.setPersons(mapUsersToWorkHours(teamUsers));
  };

  return (
    <Container disableGutters={true} maxWidth="xl">
      <Box py={3}>
        <Grid container spacing={2}>
          <Grid item xl={6} md={12}>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Team members</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamUsers && teamUsers.map((row) => (
                    <TableRow key={row.profile.email}>
                      <TableCell align="left">{row.real_name}</TableCell>
                      <TableCell align="left">{row.profile.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xl={6} md={12}>
            <Stack spacing={2} direction="column">
              <FormControl>
                <InputLabel id="demo-simple-select-label">Team</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={''}
                  value={team ? team.id : ''}
                  label="Team"
                  onChange={handleTeamChange}
                >
                  {teams.map((team) => <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>)}
                </Select>
              </FormControl>
              <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleTeamSubmit}>Load team members</Button>
                <Button variant="contained" onClick={handleTeamDisplay} color="success" disabled={!teamUsers}>Display their schedules</Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default TeamSelect;
