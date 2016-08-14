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
      }
    }

    Dispatcher.on("issues", (data) => {
      // Set objects individually so potentially undefined objects like "previous" are set correctly

      this.setState({
        pagination: {
          next: data.pagination.next || {},
          previous: data.pagination.prev || {},
          last: data.pagination.last || {},
          current: data.pagination.current || {}
        }
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

    return (
      <div className="pagination">
        <span>Page: </span>{pageSelect}
        <span className="pagination-button-container">{previousButton}{nextButton}</span>
      </div>
    );
  }
}

export default Pagination;