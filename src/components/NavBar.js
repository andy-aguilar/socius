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
import AddBoxIcon from '@material-ui/icons/AddBox';
import { connect } from 'react-redux';
import {showCreateRunModal, showEditUserModal} from '../actions/modalActions';
import {toggleLogin} from '../actions/loginActions';
import logoGrey from '../images/logoGrey.png'
import NotificationsIcon from '@material-ui/icons/Notifications';
import Notifications from './notifications';
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles((theme) => ({
  root: {
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
  const openAdd = Boolean(addAnchor);
  const [notifications, setNotifications] = React.useState(false)


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

  const handleEdit = () => {
    handleClose()
    props.showEditUserModal()
  }

  const handleLogout = () => {
    handleClose()
    localStorage.clear()
    props.history.push("/")
  }

  const createRunClick = () => {
    handleClose()
    props.showCreateRunModal()
  }

  return (
    <div className={classes.root}>
      <AppBar elevation={3} position="fixed" style={{backgroundColor: "#f44336"}}>
        <Toolbar className={classes.toolbar}>
          <img src={logoGrey} style={{height: '64px'}} />
          <Typography variant="h4" className={classes.title}>
            Socius
          </Typography>
          {localStorage.currentUser ? (
            <div>
              
                <IconButton
                  aria-label="notifications"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleClose}
                  color="inherit"
                >
              <Badge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={props.requests.length}
                color="primary"
              >
                <NotificationsIcon onClick={() => setNotifications(!notifications)}/>
                </Badge>
              </IconButton>
              
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
                <MenuItem onClick={handleEdit}>Edit Profile</MenuItem>
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
                <MenuItem onClick={ createRunClick }>Add Run</MenuItem>
                <MenuItem onClick={handleClose}>Add Club</MenuItem>
                <MenuItem onClick={handleClose}>Add Friend</MenuItem>
              </Menu>
              {notifications ?
                <Notifications /> : 
                null
              }
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
    requests: state.friends.requests,
    requestLoading: state.friends.requestLoading
  }
}

export default connect(mapStateToProps, { toggleLogin, showCreateRunModal, showEditUserModal})(MenuAppBar)