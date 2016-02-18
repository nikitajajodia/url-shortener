"use strict";

import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-inverse">
			  <div className="container">
			    <div className="navbar-header">
			      <a className="header-msg" href="#">Welcome To Uzip
			      </a>
			    </div>
			  </div>
			</nav>
		)
	}
}
export default Header;