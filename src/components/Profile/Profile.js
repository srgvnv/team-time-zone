import me from '../../me.json';
import {TextField, Grid, MenuItem, InputLabel, Box} from '@mui/material';

function Profile(props) {
  const { user } = props;
  let availableHours = [];

  ['AM', 'PM'].forEach((ampm) => {
    for (let hour = 1; hour <= 12; hour++) {
      availableHours.push({
        label: hour + ' ' + ampm,
        value: hour + ampm
      });
    }
  });

  return (
    <Box m={4}>
      <Grid container spacing={3} >
        <Grid container item xs={4} pt={12} direction="column">
          <InputLabel>Account data: </InputLabel>
          <TextField
            id='name'
            label='Name'
            variant='filled'
            margin='normal'
            defaultValue={user.givenName + ' ' + user.familyName}
            disabled
          />
          <TextField
            id='email'
            label='Email'
            variant='filled'
            margin='normal'
            defaultValue={user.email}
            disabled
          />
        </Grid>
        <Grid container item xs={4} direction="column">
          <InputLabel>Start time: </InputLabel>
          {me.working_hours.map((hours, index) => {
            return <TextField
              id={index + 'id'}
              key={index + 'key'}
              select
              disabled
              margin='normal'
              value={hours.start}
              >
              {availableHours.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
          })}
        </Grid>
        <Grid container item xs={4} direction="column">
          <InputLabel>End time: </InputLabel>
          {me.working_hours.map((hours, index) => {
            return <TextField
              id={index + 'id'}
              key={index + 'key'}
              select
              disabled
              margin='normal'
              value={hours.end}
            >
              {availableHours.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
