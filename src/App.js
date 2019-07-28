import React, { Component } from 'react';
import './styles/App.css';
import Header from  './components/Header'
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Router } from '@reach/router';
import Article from './components/Article';
import Footer from './components/Footer';
import Error from './components/Error'
import PostArticle from './components/PostArticle';
import TopicContext from './components/context/TopicContext';
import UserPage from './components/UserPage'

class App extends Component {
  state = { 
    topic: undefined
  }
  render() {
    const { topic }= this.state
    return (
      <div className="App">
        <TopicContext.Provider value={topic}>
          <Header className="headingContainer"/>
        </TopicContext.Provider>
        <Nav className="nav" changeTopic={this.changeTopic} />
        <Router>
          <UserPage className="content" path ="/users/:user_id" />
          <Articles className="content" path="/topics/:topic" />
          <Article className="content" path="/articles/:article_id" changeTopic={this.changeTopic} />
          <PostArticle className="content" path="/postarticle" />
          <Error default path="/error" />
          <Articles className="content" path="/" />
        </Router>
        <Footer />
      </div>
  )};

  changeTopic = (topic)=> {
    this.setState({
      topic
    })
  }

}


export default App;
