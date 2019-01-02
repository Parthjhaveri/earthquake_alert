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

		this.state = {

		}
	}

	componentDidMount() {
		console.log(store.getState());
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

				</tbody>
			  
			</table>
		)

	}

}

export default FeedTable;