import React, { Component } from 'react';
import Dispatcher from '../Dispatcher';
import IssueStore from '../stores/IssueStore';

class IssueDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      issue: {}
    }

  }

	componentDidMount() {
  }



  render() {

    return (
      <div className="issue-details-container">
        <div className="issue-list">
          <h2>Heres some details</h2>
        </div>
      </div>
    );
  }
}

export default IssueDetails;
