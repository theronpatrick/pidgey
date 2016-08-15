import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../Dispatcher';
import IssueStore from '../stores/IssueStore';
import removeMd from 'remove-markdown';
import shallowEquals from 'shallow-equals';
import linkUser from '../helpers/linkUser';

class IssueList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      listStyle: {
        expanded: true
      }
    }

    Dispatcher.on("issues", (data) => {

      // Scroll to top if issues data has changed
      if (!shallowEquals(data.issues, this.state.issues)) {
        ReactDOM.findDOMNode(this).scrollTop = 0;
      }

      this.setState({
        issues: data.issues,
        selectedIssue: data.selectedIssue,
        listStyle: data.listStyle
      })


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

  _selectIssue(index) {
    IssueStore.setSelectedIssue(index);
    // Refresh will trigger a publish() as well
    IssueStore.refreshIssueComments(index);
  }

  _keyPressed(index, e) {
    if(e.nativeEvent.keyCode === 13){
      this._selectIssue(index);
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

        let boundClick = this._selectIssue.bind(this, i);
        let boundKeyPress = this._keyPressed.bind(this, i);

        rows.push(<li key={i} className="issue" onClick={boundClick} data-selected={this.state.selectedIssue === i} tabIndex="0" role="button" onKeyPress={boundKeyPress}>
          <div><span className="title">{issue.title}</span></div>
          <div className="number">Issue#: {issue.number}</div>
            <div className="summary">{this._shortenSummary(issue.body)}</div>
            <div className="reported-by">Reported By: <img src={issue.user.avatar_url} alt="gravatar"></img> {linkUser(issue.user)}</div>
            <div className="labels">Labels: {labels}</div>
        </li>);
    }

    return (
      <div className="issue-list-container">
        <div className="issue-list" data-expanded={this.state.listStyle.expanded}>
          <ul>
            {rows}
          </ul>
        </div>
      </div>
    );
  }
}

export default IssueList;
