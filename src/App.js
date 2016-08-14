import React, { Component } from 'react';
import './styles/App.scss';
import Header from './components/Header';
import IssueList from './components/IssueList';
import IssueDetails from './components/IssueDetails';

class App extends Component {

  componentWillMount() {
  }

  render() {


    return (
      <div className="app">
        <Header />
        <div className="app-content">
          <IssueList />
          <IssueDetails />
        </div>
      </div>
    );
  }
}

export default App;
