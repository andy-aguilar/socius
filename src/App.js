import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeContainer from './containers/HomeContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer';
import CreateRunModal from './components/createRunModal';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {hideCreateRunSnackBar, hideUpdateError, hideUpdateSuccess, hideEditUserError, hideEditUserSuccess} from './actions/modalActions'
import EditUserModal from './components/editUserModal';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function App(props) {

  const handleClose = (event, reason) => {
    props.hideCreateRunSnackBar();
    props.hideUpdateError();
    props.hideUpdateSuccess();
    props.hideEditUserError();
    props.hideEditUserSuccess();
  }

  return (
    <div className="App" style={{ height: '100%', display: 'flex', flexFlow: 'column'}}>
      <EditUserModal/>
      <CreateRunModal/>
      <Snackbar open={props.createSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Run Created
        </Alert>
      </Snackbar>
      <Snackbar open={props.updateSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          { props.creator ? 
            `You joined ${props.creator}'s run!` :
            "You joined the run!"
          }
        </Alert>
      </Snackbar>
      <Snackbar open={props.updateError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          { props.errorMessage ? 
            props.errorMessage :
            "You've already joined that run!"
          }
        </Alert>
      </Snackbar>
      <Snackbar open={props.editUserError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          { props.errorMessage ? 
            props.errorMessage :
            "Failed to update"
          }
        </Alert>
      </Snackbar>
      <Snackbar open={props.editUserSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Profile Updated!
        </Alert>
      </Snackbar>
      <Router>
        <Route path='/' render={ routerProps => <NavBar {...routerProps}/>} />
        <Route exact path='/' render={ routerProps => <HomeContainer {...routerProps}/>} />
        <Route exact path='/dashboard' render={ routerProps => <DashboardContainer {...routerProps}/>} />
        <Route dynamic path = '/listings/?'/>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    createSuccess: state.modals.createSnackBar,
    updateSuccess: state.modals.updateSuccess,
    updateError: state.modals.updateError,
    creator: state.runs.runCreator,
    errorMessage: state.runs.errorMessage,
    editUserSuccess: state.modals.editUserSuccess,
    editUserError: state.modals.editUserError,
  }
}

export default connect(mapStateToProps, {hideCreateRunSnackBar, hideUpdateError, hideUpdateSuccess, hideEditUserError, hideEditUserSuccess})(App);
