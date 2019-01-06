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

	componentDidMount() {
		console.log(this.props);

		// STORE SCOPE
		// var component_scp = this;
		
		// setTimeout(function() {
		// 	// STORE STATE FROM REDUX STORE
		// 	const current_earthquakes = store.getState();

		// 	// SET STATE
		// 	component_scp.setState({ curr_quakes: current_earthquakes });			
		// 	// console.log('* ', component_scp.state.curr_quakes.quake_data[0]);
		// }, 1000);
	}

	generate_table() {		

		// console.log(store.getState());
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