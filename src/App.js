import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeContainer from './containers/HomeContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom'



function App() {
  return (
    <div className="App" style={{ height: '100%' }}>
      <Router>
        <Route path='/' component={ NavBar } />
        <Route exact path='/' render={ routerProps => <HomeContainer {...routerProps}/>} />
      </Router>
    </div>
  );
}

export default App;
