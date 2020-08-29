import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {toggleLogin} from '../actions/loginActions'
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Julius Sans One',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  toolbar: {
    flexDirection: 'row',
  },
  button: {

  }

}));

function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addAnchor, setAddAnchor] = React.useState(null);
  const open = Boolean(anchorEl);
  const openAdd = Boolean(addAnchor)


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdd = (event) => {
    setAddAnchor(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setAddAnchor(null);
  };

  const handleLogout = () => {
    handleClose()
    localStorage.clear()
    props.history.push("/")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" className={classes.title}>
            Socius
          </Typography>
          {localStorage.currentUser ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                aria-label="add-menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAdd}
                color="inherit"
              >
                <AddBoxIcon/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              <Menu
                id="add-menu-appbar"
                anchorEl={addAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openAdd}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Add Run</MenuItem>
                <MenuItem onClick={handleClose}>Add Club</MenuItem>
                <MenuItem onClick={handleClose}>Add Friend</MenuItem>
              </Menu>
            </div>
          )
          :
          <Button variant="contained" onClick={props.toggleLogin}>{props.login ? "SIGNUP" : "LOGIN"}</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    login: state.login,
    user: state.user,
  }
}

export default connect(mapStateToProps, { toggleLogin })(MenuAppBar)