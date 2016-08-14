import React, { Component } from 'react';
import Dispatcher from '../Dispatcher';
import ReactDOM from 'react-dom';

class IssueDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      selectedIssue: 0
    }

    Dispatcher.on("issues", (data) => {
      this.setState({
        issues: data.issues,
        selectedIssue: data.selectedIssue
      })

      // Scroll to top when new issues request is made
      ReactDOM.findDOMNode(this).scrollTop = 0;
    })

  }

	componentDidMount() {
  }



  render() {

    let issue = this.state.issues[this.state.selectedIssue];

    if (!issue) {
      return (<div>Loading...</div>)
    }

    let labels = issue.labels.map((result, index) => {
      let style = {"border": "1px solid #" + result.color};

      return <span style={style} key={index} className="label">{result.name}</span>
    })

    return (
      <div className="issue-details-container">
        <div className="issue">
          <div><h1 className="title">{issue.title}</h1></div>
          <div><span className="summary">{issue.body}</span></div>
          <div className="number">Issue#: {issue.number}</div>
          <div>Reported By: <img src={issue.user.avatar_url} alt="gravatar"></img> {issue.user.login}</div>
          <div>Labels: {labels}</div>
        </div>
      </div>
    );
  }
}

export default IssueDetails;
