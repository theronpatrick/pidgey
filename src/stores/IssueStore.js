import Dispatcher from '../Dispatcher';
import $ from 'jquery';
let IssueStore = {

  init() {
    console.log("in init");
    this._resourceUrl = "https://api.github.com/repos/rails/rails/issues";

    this._resourceParams = {
      per_page: 25,
      page: 1
    }
  },

  refresh() {
    $.ajax({
        url: this._resourceUrl,
        type: "GET",
        data: this._resourceParams
     })
     .then((r)=> {
      this.data = r;
      this.update();
     })
  },

  update() {
    Dispatcher.emit("issues" , this.data);
  }


}

IssueStore.init();

export default IssueStore;
