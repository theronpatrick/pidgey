import React, { Component } from 'react';
import './styles/App.scss';
import Header from './components/Header';
import IssueList from './components/IssueList';
import Dispatcher from './Dispatcher';
import $ from 'jquery';

class App extends Component {

  componentWillMount() {
  }

  render() {


    return (
      <div className="app">
        <Header />
        <div className="issue-list-container">
          <IssueList />
        </div>
      </div>
    );
  }
}

export default App;
