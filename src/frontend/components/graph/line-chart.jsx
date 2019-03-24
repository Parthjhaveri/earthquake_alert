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

class Linechart extends React.Component {
	constructor(props) {
		super(props);

		this.draw_chart = this.draw_chart.bind(this);

		this.state = {}		
	}

	componentDidMount() {
		setTimeout(() => {

			// EARTHQUAKES FROM FETCH FROM FEED.JSX
			var parsed_quakes = (store.getState()).quake_data[0];
			
			// MAGNITUDE 3 QUAKES
			const mag_three = parsed_quakes.filter(quake => 
				quake.properties.mag >= 3 && quake.properties.mag < 4
			);

			// DYNAMIC FUNCTION TO PARSE QUAKES
			const mag_parse = (quakemag) => {
				// NEW OBJECT
				var mag_three_obj = new Object();
				const quake_arr = []; // STORE QUAKES OBJECTS
				
				for (var i = 0; i < quakemag.length; i++) {

					// GET DATE AND TIME OF EACH MAG 3 EARTHQUAKE
					const time_stamp  = new Date(quakemag[i].properties.time);
					const string_time = time_stamp.toString();
					const mag_three_time  = new Date(string_time.split(' ').slice(1, 5)).toLocaleString();
					
					// DAY/TIME
					const quake_three_time = mag_three_time.split(' ');

					// MAGNITUDE
					const quake_three_mag = quakemag[i].properties.mag;				

					mag_three_obj = {
						emag:  quake_three_mag,
						etime: quake_three_time
					}
					
					quake_arr.push(mag_three_obj);


				} // END LOOP 
				
				console.log('QUAKE ARR ', quake_arr);

				// DISPATCH TO USE IN draw_chart FUNCTION
				store.dispatch({ type: 'PARSED-QUAKES', payload: quake_arr });
				return quake_arr;

			} // END MAG PARSE FUNCTION
			
			// PARSED MAGNITUDE THREE INVOCATION
			const parsed_mag_three = mag_parse(mag_three);		
			
			this.draw_chart(parsed_mag_three);

		}, 1000);			
	}

	draw_chart(data) {
		console.log('DATA', data);
		// DECLARE MARGIN AND DIMENSIONS
		var margin = {
			top: 20,
			right: 20,
			bottom: 30,
			left: 100
		}

		var width  = 700 - margin.left - margin.right;
		var height = 500 - margin.top - margin.bottom;

		// PARSE DATE
		var parsed_date = d3.timeParse('%d-%b-%y');

		// SET THE RANGES
		var x = d3.scaleTime().range([0, width]);
		var y = d3.scaleLinear().range([height, 3]);

		// DEFINE THE LINE
		var valueLine = d3.line()
			// .x(function(d) {return x(d.etime);})
			.y(function(d) {return y(d.emag);})

		// APPEND THE SVG OJECT TO THE BODY OF THE PAGE
		// APPEND A GROUP ELEMENT AND MOVE IT TO TOP LEFT 
		var svg = d3.select('.line-graph').append('svg')
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
			// GET PARSED EARTHQUAKES FROM REDUX STORE
			let parsed_quakes = (store.getState()).quake_data[0];			
			
			parsed_quakes.forEach((data) => {				
				data.etime = data.etime;
				data.emag = +data.emag;
				console.log(data.etime, data.emag);
				// x.domain(d3.extent(data, function(d) { return d.etime }));
			});
			
				y.domain([3, d3.max(data, function(d) { return d.emag })]);
			
			svg.append('path')
				.data([data])
				.attr('class', 'line')
				// .attr('d', valueLine)

			// // APPEND X AXIS
			// svg.append('g')
			// 	.attr('transform', 'translate(0,' + height + ')')
			// 	.call(d3.axisBottom(x));

			// APPEND THE Y AXIS
			svg.append('g')
				.call(d3.axisLeft(y));

	}

	render() {		
		return (
			<div className='line-graph'>
				
			</div>
		)
	}
}

export default Linechart;





