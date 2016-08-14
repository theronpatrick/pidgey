import Dispatcher from '../Dispatcher';
import $ from 'jquery';
import linkParser from 'parse-link-header';

import Creds from '../config/creds';

// TODO: Set this to just use basic auth

let IssueStore = {

  init() {
    this._resourceUrl = "https://api.github.com/repos/rails/rails/issues";
    this._resourceParams = {
      per_page: 25,
      page: 1
    }

    this.data = {};
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
     .then((data, status, xhr)=> {
      this.data.issues = data;
      this.data.pagination = linkParser(xhr.getResponseHeader('Link'));

      // Add current page to pagination data
      this.data.pagination.current = {
        page: this._resourceParams.page
      }

      this.publish();
     })
     .fail(() => {
        alert("oh noes! Problem with GitHub API");
      })
  },

  // Would have to be expanded to handle more params if the need arose
  setParams(params) {
    this._resourceParams.page = params.page;
  },

  publish() {
    Dispatcher.emit("issues" , this.data);
  }


}

IssueStore.init();

export default IssueStore;
