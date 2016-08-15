import React, { Component } from 'react';

import loadSvg from "../img/loader.svg";

class Loader extends Component {

  render() {

    return (
      <img src={loadSvg} className="loader" alt="loader"></img>
    );
  }
}

export default Loader;
