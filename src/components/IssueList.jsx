import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../Dispatcher';
import IssueStore from '../stores/IssueStore';
import removeMd from 'remove-markdown';

class IssueList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      issues: []
    }

    Dispatcher.on("issues", (data) => {
      console.log("data is " , data);
      this.setState({
        issues: data.issues
      })

      // Scroll to top when new issues request is made
      ReactDOM.findDOMNode(this).scrollTop = 0;
    })

  }

	componentDidMount() {
     IssueStore.refresh();
  }

  // src: http://stackoverflow.com/questions/5454235/javascript-shorten-string-without-cutting-words
  _shortenSummary(summary) {

    // Remove markdown
    summary = removeMd(summary);

    // Return if we're at 140 or less already. Otherwise, trim down.
    if (summary.length < 141) {
      return summary;
    } else {
      let maxLength = 140;

      // Trim the string to the maximum length
      let trimmedString = summary.substr(0, maxLength);

      // Re-trim if we are in the middle of a word
      return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + "…";
    }

  }



  render() {

    // TODO: Make an 'issue' component?
    let rows = [];
    for (let i = 0; i < this.state.issues.length; i++) {
        let issue = this.state.issues[i];

        let labels = issue.labels.map((result, index) => {
          let style = {"border": "1px solid #" + result.color};

          return <span style={style} key={index} className="label">{result.name}</span>
        })

        rows.push(<li key={i} className="issue">
          <div><span className="title">{issue.title}</span></div>
          <div><span className="summary">{this._shortenSummary(issue.body)}</span></div>
          <div className="number">Issue#: {issue.number}</div>
          <div>Reported By: <img src={issue.user.avatar_url}></img> {issue.user.login}</div>
          <div>Labels: {labels}</div>
        </li>);
    }

    return (
      <div className="issue-list-container">
        <div className="issue-list">
          <ul>
            {rows}
          </ul>
        </div>
      </div>
    );
  }
}

export default IssueList;
