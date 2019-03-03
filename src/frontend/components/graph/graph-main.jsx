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

// D3
// var rd3 = require('react-d3');
// var LineChart = rd3.LineChart;

class Graphmain extends React.Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	render() {
		return (
			<div className='section-main-graph'>
				<div className='row'>
					<div className='col-md-3 txt-white'>
						...
					</div>
					<div className='col-md-9 txt-white'>
						...
					</div>
				</div>
			</div>
		)
	}
}

export default Graphmain;