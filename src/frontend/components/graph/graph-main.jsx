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
import Linechart from './line-chart.jsx';

class Graphmain extends React.Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	render() {
		return (
			<div className='section-main-graph'>				
				<div className='txt-white section-main-graph__dash-board'>
					<Linechart />
				</div>
			</div>
		)
	}
}

export default Graphmain;





