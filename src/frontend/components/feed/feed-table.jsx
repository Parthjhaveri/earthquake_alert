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

		this.generate_table = this.generate_table.bind(this);

		this.state = {
			curr_quakes: []
		}
	}

	generate_table() {		

		console.log('GENERATE TABLE ', this.props.fetch_call);

		// GENERATE DYNAMIC TABLE INSIDE WHICH WE RENDER THE LOCATION, MAGNITUDE AND TIME OF THE EARTHQUAKE
		

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
					{
						this.generate_table()
					}		 

				</tbody>
			  
			</table>
		)

	}

}

export default FeedTable