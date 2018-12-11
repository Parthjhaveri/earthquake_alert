// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

class QuakeFeed extends Component {

	constructor (props) {
		super(props);

		this.state = {
			current_quake: []
		}
	}

	componentWillMount() {

		// USE CURRENT TIME TO FETCH LIVE DATA
		// GET DATE AND TIME TODAY
		let time_now = new Date().getTime();
		let date_now = new Date(time_now);
		let data_now = date_now.toString();		

		// SPLIT THE DATE TO EXTRACT TO 'YEAR-MONTH-DAY' FORMAT
		let split_date = data_now.split(' ');

		// SEGREGATE MONTH AND RETURN NUMBER INSTEAD OF MONTH		
		let date_arr = split_date.slice(1,4);

		// SHUFFLE ARRAY TO PROPER FORMAT		
		console.log(date_arr);
		
		// USE THE date_arr VARIABLE TO CONVERT THE MONTH INTO A NUMBER AND PLUG INTO FETCH CALL
		// 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02'
		// fetch ('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime='+ date_arr[2] +
		// 	   '-' + date_arr[] + '-01&endtime=2014-01-02')
	
	}

	render() {
		return (
			<div className='section-quake-feed'>
				
			</div>
		)
	}
}


export default QuakeFeed;