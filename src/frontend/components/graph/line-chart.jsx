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

// IMPORT D3
import rd3 from 'react-d3-library';
<script src="https://d3js.org/d3.v4.min.js"></script>

class Linechart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	componentDidMount() {
		setTimeout(function() {

			// EARTHQUAKES FROM FETCH FROM FEED.JSX
			var parsed_quakes = (store.getState()).quake_data[0];
			
			// MAGNITUDE 3 QUAKES
			const mag_three = parsed_quakes.filter(quake => 
				quake.properties.mag >= 3 && quake.properties.mag < 4
			);

			// NEW OBJECT
			var mag_three_obj = new Object();
			
			for (var i = 0; i < mag_three.length; i++) {

				// GET DATE AND TIME OF EACH MAG 3 EARTHQUAKE
				const time_stamp  = new Date(mag_three[i].properties.time);
				const string_time = time_stamp.toString();
				const mag_three_time  = new Date(string_time.split(' ').slice(1, 5)).toLocaleString();
				
				// DAY/TIME
				const quake_three_time = mag_three_time.split(' ');

				// MAGNITUDE
				const quake_three_mag = mag_three[i].properties.mag;

				console.log(quake_three_mag, quake_three_time);
			}
			
			

		}, 1000);
	}

	render() {		
		return (
			<div className='line-graph'>
				<svg>
				</svg>
			</div>
		)
	}
}

export default Linechart;





