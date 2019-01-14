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

		this.state = {
			curr_quakes: [],			
			quake_location: [],
			quake_magnitude: [],
			quake_time: [],
		}
	}

	componentDidMount() {
		console.log(this.props.fetch_call);

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

				table_rows.push(
					<tr className='quake-feed-table-body__table-row-dynamic' key={idx}>
						<td>{quake_loc}</td>
						<td>{quake_mag}</td>
						<td>{quake_time}</td>
					</tr>
				);
				
			});

			table.push(table_rows);


		return table;
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




