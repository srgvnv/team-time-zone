import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import DrawerComponent from '../Drawer/DrawerComponent';
import * as React from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip/Tooltip";

const useStyles = makeStyles((theme) => ({
  navLinks: {
    marginLeft: theme.spacing(5),
    display: 'flex',
      width: '100%',
      alignItems: 'center',
  },
  logo: {
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    marginLeft: theme.spacing(5),
    '&:hover': {
      color: '#ddd',
      borderBottom: '1px solid #fff',
    },
  },
    profile: {
        color: '#fff',
        marginLeft: 'auto',
    }
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          TeamTimeZone
        </Typography>
        {isMobile
          ?
            <DrawerComponent />
          :
            <div className={classes.navLinks}>
                <Link to="/" className={classes.link}>
                    1. Select Users
                </Link>
                <Link to="/timezones" className={classes.link}>
                    2. Compare Time Zones
                </Link>
                <Link to="/profile" className={classes.profile}>
                    <Tooltip title="Profile">
                        <IconButton>
                            <PersonOutlineIcon style={{fill: "#fff"}} />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
        }
      </Toolbar>
    </AppBar>
  );
}
export default Header;
