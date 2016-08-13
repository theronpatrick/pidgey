import React, { Component } from 'react';
import '../styles/IssueList.scss';

class IssueList extends Component {

	componentDidMount() {
     console.log("oh hai")
  }

  _doThing() {
    return "DOIT"
  }

  render() {
    return (
      <div className="test">testeroo {this._doThing()}</div>
    );
  }
}

export default IssueList;
