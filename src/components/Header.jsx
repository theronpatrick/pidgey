import React, { Component } from 'react';
import Pagination from './Pagination';

class Header extends Component {


	componentDidMount() {
  }


  render() {

    return (
      <div className="header">
        <div className="title-container">
          <h1>Issues on Rails</h1>
        </div>
        <div className="controls-container">
          <Pagination />
        </div>
      </div>
    );
  }
}

export default Header;
