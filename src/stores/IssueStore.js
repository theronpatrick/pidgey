import Dispatcher from '../Dispatcher';
import $ from 'jquery';
import linkParser from 'parse-link-header';

import Creds from '../config/creds';
import Router from '../Router';

// TODO: Set this to just use basic auth

let IssueStore = {

  init() {
    this._resourceUrl = "https://api.github.com/repos/rails/rails/issues";
    this._resourceParams = {
      per_page: 25,
      page: 1
    }

    // Selected issue is the index of the current issue to display
    this.data = {
      selectedIssue: 0,
      listStyle: {
        expanded: false
      },
      issues: [],
      selectedIssueComments: []
    };

    Router.registerListener(() => {
      console.log("in listener...");
      if (!this._queryParamsAreSynced()) {
        console.log("shoudl sync");
        this._syncQueryParams();
      }
    });

  },

  refresh() {

    $.ajax({
        url: this._resourceUrl,
        type: "GET",
        data: this._resourceParams,
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(Creds.un + ":" + Creds.pw))
        },
     })
     .then((data, status, xhr) => {
      this.data.issues = data;
      this.data.pagination = linkParser(xhr.getResponseHeader('Link'));

      // Add current page to pagination data
      this.data.pagination.current = {
        page: this._resourceParams.page
      }

      this.publish();

      // If we don't have comments for any issues, request one for first index
      if (this.data.selectedIssueComments.length < 1) {
        this.refreshIssueComments(0);
      }
     })
     .fail(() => {
        alert("oh noes! Problem with GitHub API");
      })
  },

  refreshIssueComments(index) {

    let id = this.data.issues[this.data.selectedIssue].number;

    $.ajax({
        url: this._resourceUrl + "/" + id + "/comments",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(Creds.un + ":" + Creds.pw))
        },
     })
     .then((data, status, xhr)=> {
      this.data.selectedIssueComments = data;
      this.publish();
     })
     .fail(() => {
        alert("oh noes! Problem with GitHub API");
      })
  },

  // Only for setting state items that modify GET params on API request (right now just page)
  setParams(params) {
    // Reset comment and selected index to 1 when changing pages
    this.data.selectedIssueComments = [];
    this.data.selectedIssue = 0;

    this._resourceParams.page = params.page;
  },

  setSelectedIssue(index) {
    this.data.selectedIssue = index;
  },

  setListStyle(listStyle) {
    this.data.listStyle = listStyle;
  },

  publish() {
    this._updateHistory();
    Dispatcher.emit("issues" , this.data);
  },

  _updateHistory() {
    if (!this._queryParamsAreSynced()) {
      Router.pushState(this.data);
    }

  },

  // I'm not wild about this implementation. Basically need to update if router params
  // aren't the same as this component's params. Maybe it's worth the time to
  // figure out React's Router after all ;)
  _queryParamsAreSynced() {
    let queryParams = Router.getQueryParams();
    if (queryParams.page !== this.data.pagination.current.page) {
      return false;
    } else {
      return true;
    }
  },

  _syncQueryParams() {
    let queryParams = Router.getQueryParams();
    this.setParams({
      page: queryParams.page
    })
  }

}

IssueStore.init();

export default IssueStore;
