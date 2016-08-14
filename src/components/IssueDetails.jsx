import React, { Component } from 'react';
import Dispatcher from '../Dispatcher';
import ReactDOM from 'react-dom';
import marked from 'marked';
import linkUser from '../helpers/linkUser';
import moment from 'moment';

class IssueDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      selectedIssue: 0,
      selectedIssueComments: []
    }

    Dispatcher.on("issues", (data) => {
      this.setState({
        issues: data.issues,
        selectedIssue: data.selectedIssue,
        comments: data.selectedIssueComments
      })

      // Scroll to top when new issues request is made
      ReactDOM.findDOMNode(this).scrollTop = 0;
    })

  }

	componentDidMount() {
  }

  // In a production environment wouldn't actually use this with a 3rd party API, but
  // could do it with our own if we can ensure it's safe on the server
  _createMarkup(markdown) {
    return {__html: marked(markdown)};
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

    console.log("comments..." , this.state.comments);

    let comments = this.state.comments.map((result, index) => {
      return <li key={index}>
        <div dangerouslySetInnerHTML={this._createMarkup(result.body)}></div>
        <div className="timestamp">{linkUser(result.user)} at {moment(result.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
      </li>
    })



    return (
      <div className="issue-details-container">
        <div className="issue">
          <div><h1 className="title" dangerouslySetInnerHTML={this._createMarkup(issue.title)}></h1></div>
          <div className="summary" dangerouslySetInnerHTML={this._createMarkup(issue.body)}></div>
          <div className="number">Issue#: {issue.number}</div>
          <div>Reported By: <img src={issue.user.avatar_url} alt="gravatar"></img> {linkUser(issue.user)}</div>
          <div>Labels: {labels}</div>
          <div>Comments ({this.state.comments.length}):
            <ul>
              {comments}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default IssueDetails;
