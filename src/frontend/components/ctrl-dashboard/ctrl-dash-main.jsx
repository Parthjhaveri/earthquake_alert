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

	componentDidMount() {
		const mag_buttons = [].slice.call(document.getElementsByClassName('mag-button'));
		mag_buttons.forEach((el) => {
			el.addEventListener('click', function() {
				store.dispatch({ type: 'GET-DATASET', payload: this.dataset.mag });				
			})
		})
	}

	// CHANGE MAGNITUDE BUTTON
	change_mag() {
		
		// DYNAMICALLY GENERATE 9 BUTTONS
		// ON CLICK, SEND DATA ATTRIBUTE OF THAT BUTTON TO REDUX, INSIDE LINE CHART, GET 
		// THAT ATTRIBUTE AND INJECT INTO CODE.
		var mag_buttons = [];

		for (var i = 1; i < 10; i++) {
			mag_buttons.push(
				<button 
					className = 'mag-button'
					data-mag  = {'' + i}
					value     = {'Magnitude ' + i}
					key		  = {i}					
				>
				{'Magnitude ' + i}
				</button>
			)
		}		
		return mag_buttons;			
		
	}

	render() {
		return (
			<div className='section-main-dash'>
				<h3>Sort By Magnitude</h3>
				<p>
					Select a magnitude button to 
					cycle through the graph below <i className="fas fa-angle-down"></i>
				</p>				
				{
					this.change_mag()
				}
			</div>
		)
	}
}

export default ControlDashboardMain;