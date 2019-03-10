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
			console.log(parsed_quakes);

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





