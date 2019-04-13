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

		this.change_mag = this.change_mag.bind(this);

		this.state = {	
		}
	}

	// CHANGE MAGNITUDE BUTTON
	change_mag() {	
		setTimeout(() => {
			var section_dash = document.getElementById('main-dash-root');
			// GENERATE 9 BUTTONS
			for (var i = 1; i < 10; i++) {
				// CREATE THE BUTTONS
				var mag_btn = document.createElement('BUTTON');

				// SET THE ATTRIBUTES AND APPEND
				mag_btn.setAttribute('className', 'mag-button');
				mag_btn.setAttribute('data-mag', '' + i);
				section_dash.appendChild(mag_btn);
			}
		}, 500);
	}

	render() {
		return (
			<div className='section-main-dash' id='main-dash-root'>
				<h3>Sort By Magnitude</h3>
				<p>
					Select a magnitude button to 
					cycle through the graph below <i className="fas fa-angle-down"></i>
				</p>
				{this.change_mag()}
			</div>
		)
	}
}

export default ControlDashboardMain;