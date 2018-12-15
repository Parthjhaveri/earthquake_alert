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
		let year  = date_arr[2];
		let month = date_arr[0];
		let day   = date_arr[1];

		// IF MONTH STRING, PARSE TO NUMERIC
		  month === 'Dec' ? month = '12' 
		: month === 'Nov' ? month = '11' 
		: month === 'Oct' ? month = '10' 
		: month === 'Sep' ? month = '09' 
		: month === 'Aug' ? month = '08' 
		: month === 'Jul' ? month = '07'
		: month === 'Jun' ? month = '06' 
		: month === 'May' ? month = '05' 
		: month === 'Apr' ? month = '04' 
		: month === 'Mar' ? month = '03' 
		: month === 'Feb' ? month = '02' 
		: month === 'Jan' ? month = '01' 
		: null;

		// TODAY USING MODIFIED YEAR, MONTH, DATE
		const today = [year, month, day]
		
		// USE THE VARIABLES TO PLUG IN YEAR, MONTH, DAY AND INITIATE FETCH CALL
		fetch ('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + year + 
			   '-' + month + '-' + day + '&minmagnitude=5')

		.then((response) => {
			return response.json();
		})

		.then((json) => {
			console.log(json);
		})

	
	}

	render() {
		return (
			<div className='section-quake-feed'>
				
			</div>
		)
	}
}


export default QuakeFeed;