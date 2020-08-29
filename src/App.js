import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeContainer from './containers/HomeContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LandingContainer from './containers/DashboardContainer'



function App() {
  return (
    <div className="App" style={{ height: '100%', backgroundColor: 'grey' }}>
      <Router>
        <Route path='/' render={ routerProps => <NavBar {...routerProps}/>} />
        <Route exact path='/' render={ routerProps => <HomeContainer {...routerProps}/>} />
        <Route exact path='/dashboard' render={ routerProps => <LandingContainer {...routerProps}/>} />
      </Router>
    </div>
  );
}

export default App;
