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
import ReactD3 from 'd3';
import { LineChart, Brush, d3 } from 'react-d3-components';

class Linechart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	componentDidMount() {

	}

	render() {
		var lineData = [
		  {
		    name: "series1",
		    values: [ { x: 0, y: 20 }, { x: 24, y: 10 } ]
		  },
		  
		  {
		    name: "series2",
		    values: [ { x: 70, y: 82 }, { x: 76, y: 82 } ]
		  }
		];
		return (
			<div>
				<LineChart
				  legend={true}
				  data={lineData}
				  width={500}
				  height={300}
				  title="Line Chart"
				/>
			</div>
		)
	}
}

export default Linechart;





