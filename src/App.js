import React, { Component } from 'react';
import './styles/App.scss';
import IssueList from './components/IssueList';

class App extends Component {

  componentDidMount() {
    console.log("loaded")


  }

  render() {
    return (
      <div className="App">
        <h1>Issue Viewer</h1>
        <IssueList />
      </div>
    );
  }
}

export default App;
