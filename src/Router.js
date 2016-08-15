import { createHistory, useQueries} from 'history';

const Router = {

  constructor(options) {
    this.history = useQueries(createHistory)();
  },

  pushState(state) {

    // Build query based on state (fixed 'perPage' for now)
    console.log('state is ' , state);

    let query = {
      page: state.pagination.current.page,
      per_page: 25
    }

    this.history.push({
      query: query
    })
  },

  registerListener(callBack) {
    // Listen for changes to the current location
    this.unlisten = this.history.listen(location => {
      console.log("router changed" , location);
      callBack();
    })
  },

  getQueryParams() {
    return this.history.getCurrentLocation().query;
  },

  init() {
    this.constructor();
  }

}

// Should only be used as helper library and never instantiated from classes, only here.
Router.init();

export default Router;
