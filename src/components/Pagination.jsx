import React, { Component } from 'react';
import Dispatcher from '../Dispatcher';
import IssueStore from '../stores/IssueStore';
import $ from 'jquery';

class Pagination extends Component {


	constructor(props) {
    super(props);

    this.state = {
      pagination: {
        next: {},
        previous: {},
        last: {},
        current: {}
      },
      listStyle: {
        expanded: true
      }
    }

    Dispatcher.on("issues", (data) => {
      // Set objects individually so potentially undefined objects like "previous" are
      // set to empty objects if neccessary

      this.setState({
        pagination: {
          next: data.pagination.next || {},
          previous: data.pagination.prev || {},
          last: data.pagination.last || {},
          current: data.pagination.current || {}
        },
        listStyle: data.listStyle,
        expandButtonText: data.listStyle.expanded ? "Expand" : "Collapse"
      })
    })

  }

  _buttonClick = (e) => {
    let page = $(e.currentTarget).attr("data-page");
    this._goToPage(page);
  }

  _selectChange = (e) => {
    let page = $(e.currentTarget).val();
    this._goToPage(page);
  }

  _goToPage(page) {
    IssueStore.setParams({
      page: page
    })
    IssueStore.refresh();
  }

  _expandedButtonClick = (e) => {
    IssueStore.setListStyle({
      expanded: !this.state.listStyle.expanded
    })
    IssueStore.refresh();
  }


  render() {

    let previousButton;
    let nextButton;

    if (this.state.pagination.previous.page) {
      previousButton = <button type="button" onClick={this._buttonClick} data-page={this.state.pagination.previous.page}>Previous</button>
    }
    if (this.state.pagination.next.page) {
      nextButton = <button type="button" onClick={this._buttonClick} data-page={this.state.pagination.next.page}>Next</button>
    }

    let options = [];
    // API doesn't return last if we're on last page already
    let lastPage = this.state.pagination.last.page || this.state.pagination.current.page
    for (let i = 1; i <= lastPage; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }

    let pageSelect = <select onChange={this._selectChange} value={this.state.pagination.current.page}>
      {options}
    </select>

    // Calculate issue result numbers shown. Could be expanded to take in
    // state from IssueStore instead of hard coding results per page
    let issueNumbers;
    if (this.state.pagination.current.page) {
      let perPage = 25;
      let firstNum = (parseInt(this.state.pagination.current.page) - 1) * perPage + 1;
      let lastNum = firstNum + perPage - 1;
      issueNumbers = <span>Displaying {firstNum} - {lastNum}</span>
    }

    return (
      <div className="pagination">
        <div className="pagination-number-container">
          <span>Page: </span>{pageSelect}
          <button type="button" onClick={this._expandedButtonClick}>{this.state.expandButtonText}</button>
          <span className="pagination-button-container">{previousButton}{nextButton}</span>
        </div>
        <div>
          {issueNumbers}
        </div>
      </div>
    );
  }
}

export default Pagination;
