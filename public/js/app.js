"use strict";

import React from 'react';
import { Link } from 'react-router';

import Header from './header';
import Footer from './footer';

class App extends React.Component {
  render() {
    return(
	    <div className="wrapper">
	    	<Header />
	    	<div className="container content">
		    	<h1>URL shortener!</h1>
		    	<div className="menus">
			    	<Link to="about" className="menu-item">About</Link>
			    	<Link to="dashboard" className="menu-item">Dashboard</Link>
		    	</div>
		    	{this.props.children} {/*To let this component know that which component is to be rendered here*/}
	    	</div>
	    	<Footer />
	    </div>
    ) 
  }
}
export default App;