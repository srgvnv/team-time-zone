import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import DrawerComponent from '../Drawer/DrawerComponent';

const useStyles = makeStyles((theme) => ({
  navLinks: {
    marginLeft: theme.spacing(5),
    display: 'flex',
  },
  logo: {
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#ddd',
    marginLeft: theme.spacing(5),
    '&:hover': {
      color: '#ddd',
      borderBottom: '1px solid #fff',
    },
  },
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
                Time zones
              </Link>
              <Link to="/users" className={classes.link}>
                Users
              </Link>
              <Link to="/profile" className={classes.link}>
                My profile
              </Link>
            </div>
        }
      </Toolbar>
    </AppBar>
  );
}
export default Header;
