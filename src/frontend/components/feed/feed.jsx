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
			current_quakes: [],
			quakes_list: []
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
		const today = [year, month, day];
		let past_date = day - 2;		
		past_date.toString();

		// FETCH CALL TO GET DATA (ARROW FUNCTION TO BIND TO PARENT SCOPE)
		const repeat_fetch = () => {

			// ----------------- INITIAL FETCH -----------------
				// USE THE VARIABLES TO PLUG IN YEAR, MONTH, DAY AND INITIATE FETCH CALL
				fetch ('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + year + '-' + month + '-' + past_date + 
					   '&endtime=' + year + '-' + month + '-' + day + '&minmagnitude=3')

				.then((response) => {
					// console.log(response);
					return response.json();
				})

				.then((json) => {		
					// console.log(json);
					let eq_props = json.features;	

					if (eq_props.length > 0) {

						store.dispatch({ type: 'FETCH-RESPONSE', payload: eq_props })

						// EARTHQUAKE DATA FROM FETCH 
						let fetched_req = store.getState();
						
						// SET COMPONENT STATE TO STATE FROM REDUX STORE
						this.setState({current_quakes: fetched_req});					
						
						// LOG CURRENT EARTHQUAKES
						// console.log('Data', this.state.current_quakes);

						// CURRENT EARTHQUAKES
						const quakes = [].slice.call(this.state.current_quakes.quake_data);
						
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
							
							/* 
								PUSHES THIS OBJECT TO THE REDUX STORE SO THAT YOU CAN ACCESS IT INSIDE 
								THE FEED TABLE COMPONENT AND CREATE A DYNAMIC TABLE	
							*/
							store.dispatch({ type: 'STORE-QUAKES', payload: quake_table_data });
						} // END LOOP					
						
						// GET PROPS FROM mapStateToProps OF REDUX STATE AND SET STATE					
						this.setState({ quakes_list: this.props.e_quakes[0]});
						// console.log('QUAKES LIST COMPONENT STATE ', this.state.quakes_list);
					} else {
						console.log('API returning empty array');
						return null;
					}
				}) // END THEN

			// -------------------------------------------------

			setTimeout(function() {
				// USE THE VARIABLES TO PLUG IN YEAR, MONTH, DAY AND INITIATE FETCH CALL
				fetch ('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + year + '-' + month + '-' + past_date + 
					   '&endtime=' + year + '-' + month + '-' + day + '&minmagnitude=3')

				.then((response) => {
					return response.json();
				})

				.then((json) => {								
					repeat_fetch();		
				})
			}, 330000);
		
		} // END repeat_fetch()

		repeat_fetch();
	}

	render() {
		return (
			<div className='section-quake-feed'>
				{
					this.state.quakes_list.length ? (
						<FeedTable fetch_call={this.state.quakes_list} />
					) : (						
						<h4 className='section-quake-feed__loading'>Loading...</h4>
					)
				}

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		e_quakes: state.quake_data
	}
}

export default connect(mapStateToProps)(QuakeFeed);








