import React from 'react';
import './styles/App.css';
import Header from  './components/Header'
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router> 
        <Header path="topics/:topic"/>
        <Header path="/"/>
      </Router>
      <Nav className="nav" />
      <Router> 
        <Articles path="topics/:topic"/>
        <Articles path="/"/>
      </Router>
    </div>
  );
}

export default App;
