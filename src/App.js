import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomeContainer from './containers/HomeContainer';



function App() {
  return (
    <div className="App" style={{ height: '100%' }}>
      <NavBar/>
      <HomeContainer />
    </div>
  );
}

export default App;
