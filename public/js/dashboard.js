"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import * as rest from './rest'
import * as utility from './utility'
import { Router, Route, Link, browserHistory } from 'react-router'

class Dashboard extends React.Component {
	constructor(props) { //Read 
    super(props); //Doubt
    this.state = { 
    	msg : '',
    	url : ''
    };
  }
	setMsg(msg) {
		this.setState({
			msg : msg
		})
	}
	shortenURL(e) {
		var self = this;
		/* 
		* ReactDOM.findDOMNode(this.refs.Url) - bind is used on the click event of button since es6 doesnot give autobinding as in React.createClass()
		*/
		let longUrl = ReactDOM.findDOMNode(this.refs.Url).value.trim();
		if(longUrl !== ""){
			if(utility.validateUrl(longUrl)){
				this.setMsg("")
				rest.addUrl(longUrl)
				.then(function(data, error){
				 	self.setState({
				 		url: data.entity
				 	})
				});
			}
			else {
				this.setMsg("URL not valid")
			}
		} else {
				this.setMsg("Please enter a URL")
			}
	}
	handleEnter(e) {
		if(e.keyCode === 13){
			this.shortenURL()
			return false //To stop the page from refreshing since the markup is inside a form - hence stop the default behaviour
		}
	}
	render() {
		return (
		  <div className="container dashboard">
		  	<form>
          <div className="create-board">
            <div className="board-header">
            </div>
            <div className="control-group txt-control">
            	<div className="form-group">
	              <label className="control-label" htmlFor="inputURL">Enter your long URL here</label>
	              <input type="text" ref="Url" className="form-control" onKeyDown={this.handleEnter.bind(this)} placeholder="Enter Your Long URL here"></input>
              </div>
              <div className="control-group but-control">
                <div className="controls">
                  <button className="btn btn-info" type="button" onClick={this.shortenURL.bind(this)}>Shorten</button>
                </div>
              </div>
              <label>{this.state.msg}</label>
              <div><a target="_blank" href={this.state.url}>{this.state.url}</a></div>
            </div>
          </div>
        </form>
		  </div>
		)
	}
}
export default Dashboard;