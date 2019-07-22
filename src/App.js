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
      <Header className="headingContainer"/>
      <Nav className="nav" />
      <Router>
        <Articles className="content" path="/topics/:topic"/>
        <Article className="content" path="/articles/:article_id" />
        <PostArticle className="content" path="/postarticle" />
        <Error default path="/error" />
        <Articles className="content" path="/"/>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
