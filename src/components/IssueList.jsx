import React, { Component } from 'react';
import '../styles/IssueList.scss';
import $ from 'jquery';

class IssueList extends Component {

  constructor(props) {
    super(props);

    this._resourceUrl = "https://api.github.com/repos/rails/rails/issues";

    this._resourceParams = {
      per_page: 25,
      page: 1
    }

    this.state = {
      issues: []
    }

  }

	componentDidMount() {
     console.log("oh hai " , this._resourceUrl);

     $.ajax({
        url: this._resourceUrl,
        type: "GET",
        data: this._resourceParams
     })
     .then((r)=> {
      this.setState({
        issues: r
      })
     })


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
