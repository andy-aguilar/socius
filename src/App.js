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
import {hideCreateRunSnackBar} from './actions/modalActions'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function App(props) {

  const handleClose = (event, reason) => {
    props.hideCreateRunSnackBar()
  }

  return (
    <div className="App" style={{ height: '100%'}}>
      <CreateRunModal/>
      <Snackbar open={props.createSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Run Created
        </Alert>
      </Snackbar>
      <Router>
        <Route path='/' render={ routerProps => <NavBar {...routerProps}/>} />
        <Route exact path='/' render={ routerProps => <HomeContainer {...routerProps}/>} />
        <Route exact path='/dashboard' render={ routerProps => <DashboardContainer {...routerProps}/>} />
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    createSuccess: state.modals.createSnackBar
  }
}

export default connect(mapStateToProps, {hideCreateRunSnackBar})(App);
