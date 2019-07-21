import React from 'react';
import './styles/App.css';
import Header from  './components/Header'
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Router } from '@reach/router';
import Article from './components/Article';
import Footer from './components/Footer';
import Error from './components/Error'
import PostArticle from './components/PostArticle';

function App() {
  return (
    <div className="App">
      <div className="headingContainer">
        <Router> 
          <Header path="topics/:topic"/>
          <Header path="articles/:article_id"/>
        </Router>
      </div>
      <Nav className="nav" />
      <Router> 
        <Articles path="topics/:topic"/>
        <Articles path="/"/>
        <Article path="/articles/:article_id" />
        <PostArticle path="postarticle" />
        <Error default path="/error" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
