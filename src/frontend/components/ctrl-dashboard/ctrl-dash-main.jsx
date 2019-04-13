// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

// COMPONENT IMPORTS
import FeedTable from '../feed/feed-table.jsx';

class ControlDashboardMain extends React.Component {
	constructor(props) {
		super(props);

		this.state = {	
		}
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className='section-main-dash'>
				<h3>Sort By Magnitude</h3>
				<p>
					Select a magnitude button to 
					cycle through the graph below <i class="fas fa-angle-down"></i>
				</p>
			</div>
		)
	}
}

export default ControlDashboardMain;