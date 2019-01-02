// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

// COMPONENT IMPORTS
import FeedTable from './feed-table.jsx';

class QuakeFeed extends Component {

	constructor (props) {
		super(props);	

		this.state = {
			current_quakes: []
		}
	}

	componentDidMount() {

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
		let yesterday = day - 1;		
		yesterday.toString();
		
		// COMPONENT SCOPE
		var component_scope = this;

		function repeat_fetch() {


			// ----------------- INITIAL FETCH -----------------
				// USE THE VARIABLES TO PLUG IN YEAR, MONTH, DAY AND INITIATE FETCH CALL
				fetch ('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + year + '-' + month + '-' + yesterday + 
					   '&endtime=' + year + '-' + month + '-' + day + '&minmagnitude=5')

				.then((response) => {
					return response.json();
				})

				.then((json) => {			
					let eq_props = json.features;

					store.dispatch({ type: 'FETCH-RESPONSE', payload: eq_props })

					// EARTHQUAKE DATA FROM FETCH 
					let fetched_req = store.getState();
					
					// SET COMPONENT STATE TO STATE FROM REDUX STORE
					component_scope.setState({current_quakes: fetched_req});					
					
					// LOG CURRENT EARTHQUAKES
					// console.log('Data', component_scope.state.current_quakes);

					// CURRENT EARTHQUAKES
					const quakes = [].slice.call(component_scope.state.current_quakes.quake_data);
					
					// STORE QUAKES IN OBJECT TO PACKAGE AND PUSH INTO REDUX STORE
					let quake_table_data = {};					
					
					for (var i = 0; i < quakes[0].length; i++) {

						// LOCATION, MAGNITUDE, TIME OF CURRENT EARTHQUAKES
						const quake_location = quakes[0][i].properties.place;
						const quake_mag      = quakes[0][i].properties.mag;
						const quake_time     = new Date(quakes[0][i].properties.time).toLocaleString();

						quake_table_data.loc = quake_location;
						quake_table_data.mg  = quake_mag;
						quake_table_data.tim = quake_time;
						
						// console.log(quake_table_data);
						
						/* 
							PUSHES THIS OBJECT TO THE REDUX STORE SO THAT YOU CAN ACCESS IT INSIDE 
							THE FEED TABLE COMPONENT AND CREATE A DYNAMIC TABLE	
						*/
						store.dispatch({ type: 'STORE-QUAKES', payload: quake_table_data });
					}					
				
					console.log('STORE DATA ', store.getState());
						
				})					
			// -------------------------------------------------

			setTimeout(function() {
				// USE THE VARIABLES TO PLUG IN YEAR, MONTH, DAY AND INITIATE FETCH CALL
				fetch ('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + year + '-' + month + '-' + yesterday + 
					   '&endtime=' + year + '-' + month + '-' + day + '&minmagnitude=5')

				.then((response) => {
					return response.json();
				})

				.then((json) => {			
					// console.log('RESPONSE AFTER 5 MINUTES ', json);
					repeat_fetch();		
				})
			}, 330000);
		
		} // END repeat_fetch()

		repeat_fetch();

	}

	render() {
		return (
			<div className='section-quake-feed'>
				
				<FeedTable />

			</div>
		)
	}
}


export default QuakeFeed;