import React from 'react';
import './styles/App.css';
import Header from  './components/Header'
import Nav from './components/Nav';
import Articles from './components/Articles';

function App() {
  return (
    <div className="App">
      <Header className="heading"/>
      <Nav className="nav" />
      <Articles className="content" />
    </div>
  );
}

export default App;
