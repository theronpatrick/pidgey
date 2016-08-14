import React, { Component } from 'react';
import '../styles/IssueList.scss';
import $ from 'jquery';
import Dispatcher from '../Dispatcher';
import IssueStore from '../stores/IssueStore';

class IssueList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      issues: []
    }

    Dispatcher.on("issues", (d) => {
      this.setState({
        issues: d
      })
    })

  }

	componentDidMount() {
     IssueStore.refresh();
  }



  render() {

    // TODO: Make an 'issue' component?
    let rows = [];
    for (let i = 0; i < this.state.issues.length; i++) {
        rows.push(<li key={i} className="issue">{this.state.issues[i].title}</li>);
    }

    return (
      <div className="issue-list">
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
}

export default IssueList;
