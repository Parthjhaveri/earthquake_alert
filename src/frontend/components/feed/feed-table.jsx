// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

class FeedTable extends Component {

	constructor(props) {
		super(props);

		this.genereate_table = this.genereate_table.bind(this);
		this.change_pin = this.change_pin.bind(this);

		this.state = {
			curr_quakes: [],
			coord_func: []
		}
	}

	componentDidMount() {
		// console.log(this.props.fetch_call);

		// DISPATCH QUAKES TO REDUX STORE TO DISPLAY IN MAP
		store.dispatch({ type: 'MAP-DATA', payload: this.props.fetch_call });
	}

	genereate_table() {		

		/*  GENERATE DYNAMIC TABLE INSIDE WHICH WE RENDER THE LOCATION, 
			MAGNITUDE AND TIME OF THE EARTHQUAKE */

		// TABLE
		let table = [];			

			// TABLE ROWS
			let table_rows = [];

			this.props.fetch_call.forEach((el, idx) => {
				const quake_loc  = el.properties.place; // QUAKE LOCATION
				const quake_mag  = el.properties.mag;   // QUAKE MAGNITUDE
				const quake_time = new Date(el.properties.time).toLocaleString(); // QUAKE TIME								
				const quake_long = el.geometry.coordinates[0];// QUAKE COORINATES
				const quake_lat  = el.geometry.coordinates[1];// QUAKE COORINATES
			

				table_rows.push(
					<tr className='quake-feed-table-body__table-row-dynamic' key={idx} onClick={this.props.onClick} onClick={(event) => {this.change_pin(event)}} ref={c => this.current_row = c}>
						<td data-location={quake_loc} data-lat={quake_lat} data-lng={quake_long}>{quake_loc}</td>
						<td data-mag={quake_mag} data-lat={quake_lat} data-lng={quake_long}>{quake_mag}</td>
						<td data-time={quake_time} data-lat={quake_lat} data-lng={quake_long}>{quake_time}</td>
					</tr>
				);
				
			});

			table.push(table_rows);

		return table;
	}

	change_pin(event) {		

		// STORE LAT LONG AND SEND FUNCTION AS PROPS TO QUAKE MAP
		var change_func = (event) => {

			// STORE CURRENT TARGET CLICK'S LAT & LONG
			var click_lat = event.currentTarget.children[1].dataset.lat; 
			var click_long = event.currentTarget.children[2].dataset.lng; // SEND THESE AS PROPS TO QUAKE MAP
			console.log(click_lat, click_long);
			
			return event.currentTarget;
		}
		change_func(event);	
	}

	render() {

		return (
			<table className='section-quake-feed__quake-feed-table'>
			  	<tbody className='quake-feed-table__quake-feed-table-body'>
					<tr className='quake-feed-table-body__table-heading-row'>
						<th>Location</th>							
						<th>Magnitude</th>							
						<th>Time</th>
					</tr>							
		  			{ this.genereate_table() }
				</tbody>
			</table>
		)

	}

}

export default FeedTable;




