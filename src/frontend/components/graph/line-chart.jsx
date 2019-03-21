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
				console.log(quake_arr);
			} // END FUNCTION
			
			// PARSED MAGNITUDE THREE INVOCATION
			const parsed_mag_three = mag_parse(mag_three);		
			this.draw_chart(parsed_mag_three);

		}, 1000);
	}

	draw_chart(data) {
		// SVG CONSTRUCTOR
		var svg_width = 600;
		var svg_height = 400;
		var margin = { top: 20, right: 20, bottom: 30, left: 50 };
		var width = svg_width - margin.left - margin.right;
		var height = svg_height - margin.top - margin.bottom;

		// SET SVG WIDTH, HEIGHT
		var svg = d3.select('svg')
			.attr('width', svg_width)
			.attr('height', svg_height);

		// CREATE GROUP, THEN APPEND
		var g = svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
		console.log(d3);
		// CREATE SCALES
		var x = d3.scaleTime().rangeRound([0, width]);
		var y = d3.scaleLinear().rangeRound([height, 0]);

		// CREATE LINES
		var line = d3.line()
			.x(function(d) {return x(d.etime)})
			.y(function(d) {return y(d.emag)})

			x.domain(d3.extent(data, function(d) {return d.etime}));
			y.domain(d3.extent(data, function(d) {return d.emag}));

		// APPEND AXISES
		g.append('g')
			.attr('transform', 'translate (0,' + height + ')')
			.call(d3.axisBottom(x))
			.select('.domain')
			.remove();

		g.append('g')
		    .call(d3.axisLeft(y))
		    .append("text")
		    .attr("fill", "#fff")
		    .attr("transform", "rotate(-90)")
		    .attr("y", 6)
		    .attr("dy", "0.71em")
		    .attr("text-anchor", "end")
		    .text("Magnitude");
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





