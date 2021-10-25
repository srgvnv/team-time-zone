import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';

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
    color: 'white',
    marginLeft: theme.spacing(5),
    '&:hover': {
      color: '#ddd',
      borderBottom: '1px solid #fff',
    },
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          TeamTimeZone
        </Typography>
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
      </Toolbar>
    </AppBar>
  );
}
export default Header;
