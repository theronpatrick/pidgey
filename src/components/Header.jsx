import React, { Component } from 'react';
import $ from 'jquery';

class Header extends Component {

  constructor(props) {
    super(props);

  }

	componentDidMount() {


  }


  render() {

    return (
      <div className="header">
        <div className="title-container">
          <h1>Issue Viewer</h1>
        </div>
        <div className="controls-container">
          <h2>Controls to come...</h2>
        </div>
      </div>
    );
  }
}

export default Header;
