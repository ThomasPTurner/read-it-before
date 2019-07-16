import React from 'react';
import './styles/App.css';
import Header from  './components/Header'
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router className="headingContainer"> 
        <Header path="topics/:topic"/>
        <Header path="/"/>
      </Router>
      <Nav className="nav" />
      <Articles className="content" />
    </div>
  );
}

export default App;
