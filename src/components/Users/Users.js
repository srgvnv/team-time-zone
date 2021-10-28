import teams from "../../teams"
import users from "../../users"
import usersContext from "../../users.context"
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from "@mui/material/Container";
import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

function Row(props) {
    const { team, isSelected, handleClick } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', bgcolor: '#fafbfc' } }} onClick={() => setOpen(!open)}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{team.name}</TableCell>
                <TableCell>{team.description}</TableCell>
                <TableCell align="right">{team.user_count}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Team Members
                            </Typography>
                            <Table aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Avatar</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Position</TableCell>
                                        <TableCell>Time Zone</TableCell>
                                        <TableCell align="right">Time Zone Offset</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {team.users.map((userId) => {
                                        let user = users.find(user => user.id === userId) || {profile: {fields: {}}}
                                        const isItemSelected = isSelected(user.id)
                                        let offset = user.tz_offset / 60 / 60
                                        let prefix = offset > 0 ? '+' : ''
                                        offset = offset % 1 === 0 ? offset + ':00' : Math.floor(offset) + ':30'

                                        return <TableRow key={user.id} selected={isItemSelected}
                                                         onClick={(event) => handleClick(event, user.id)}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': user.id,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell><Avatar alt={user.real_name} src={user.profile.image_48} /></TableCell>
                                                <TableCell component="th" scope="row">
                                                    {user.real_name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {(user.profile.fields.Xf5R4QALE5 || {}).value}
                                                </TableCell>
                                                <TableCell>{user.tz_label}</TableCell>
                                                <TableCell align="right">
                                                    <Chip label={prefix + offset} variant="outlined" /></TableCell>
                                            </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    team: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        user_count: PropTypes.number.isRequired,
        users: PropTypes.arrayOf(
            PropTypes.shape({
                real_name: PropTypes.string.isRequired,
                tz_label: PropTypes.string.isRequired,
                tz_offset: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const UsersTableToolbar = (props) => {
    const { numSelected, setUsers, clearUsers } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Teams
                </Typography>
            )}

            {numSelected > 0 && (
                <div style={{display: 'flex'}}>
                    <Tooltip title="Compare Time Zones">
                        <IconButton onClick={setUsers}>
                            <AccessTimeIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Clear Selected Users">
                        <IconButton onClick={clearUsers}>
                            <ClearAllIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )}
        </Toolbar>
    );
};

export default function Users(props) {
    const { setUsers } = React.useContext(usersContext);
    const [selected, setSelected] = React.useState(props.users);

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        setUsers(newSelected)
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <Container disableGutters={true} maxWidth="xl">
            <Box py={3}>
                <UsersTableToolbar numSelected={selected.length} setUsers={() => {
                    setUsers(selected)
                    props.history.push('/timezones')
                }}
                clearUsers={() => {
                    setSelected([]);
                    setUsers([])
                }}/>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Total members</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teams.map((team) => <Row key={team.id}
                                                      team={team}
                                                      isSelected={isSelected}
                                                      handleClick={handleClick} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}
