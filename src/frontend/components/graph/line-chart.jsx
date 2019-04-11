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

				var line_points = [];
				
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

					var date_format  = new Date(mag_three_time);
					var milli_format = date_format.getTime();
					
					line_points.push([quake_three_mag, milli_format]);
					
					quake_arr.push(mag_three_obj);


				} // END LOOP 
				
				// DISPATCH TO USE IN draw_chart FUNCTION
				store.dispatch({ type: 'PARSED-QUAKES', payload: quake_arr });
				return quake_arr;

			} // END MAG PARSE FUNCTION
			
			// PARSED MAGNITUDE THREE INVOCATION
			const parsed_mag_three = mag_parse(mag_three);		
			
			this.draw_chart(parsed_mag_three);

		}, 1000);			
	}

	// LINE CHART FUNCTION
	draw_chart(data) {

		// DECLARE MARGIN AND DIMENSIONS
		var margin = {
			top: 20,
			right: 200,
			bottom: 200,
			left: 80
		}

		// SET THE WIDTH AND HEIGHT
		var width  = 1200 - margin.left - margin.right;
		var height = 500 - margin.top - margin.bottom;

		// APPEND THE SVG OJECT TO THE BODY OF THE PAGE
		// APPEND A GROUP ELEMENT AND MOVE IT TO TOP LEFT 
		var svg = d3.select('.line-graph').append('svg')
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
			// GET PARSED EARTHQUAKES FROM REDUX STORE
			let parsed_quakes = (store.getState()).quake_data[0];						

			// FORMAT THE MAG AND TIME
			parsed_quakes.forEach((data) => {				
				data.etime = data.etime.join(' ');
				data.emag  = data.emag;
			});	
			
			// SET THE RANGES
			var x = d3.scaleTime().range([0, width]);
			var y = d3.scaleLinear().range([height, 0]);
			
			// CONVERT DATES BACK TO MILLISECONDS
			data.forEach(function(el) {
				var date_format  = new Date(el.etime);
				var millis_format = date_format.getTime();
				
				// CONVERT THE STRING DATE/TIME FORMAT TO MILLISECONDS
				el.etime = millis_format;
			});
			
			// SET THE DOMAINS
			// CREATE VALUES FOR THE X AXIS FROM MIN TO MAX	
			// FORMAT THE X AXIS TO SHOW PROPER DATE/TIMES
			var x_axis = d3.scaleBand()
				.range([width, 0])
				.domain(data.map((d) => new Date(d.etime).toLocaleString()))				
						
			x.domain(d3.extent(data, function(d) { return d.etime }));
			// CREATE VALUES FOR THE Y AXIS FROM MIN TO MAX	
			y.domain([3, d3.max(data, function(d) { return d.emag })]);	

			// DEFINE THE LINE
			var value_line = d3.line()
				.x(function(d) {return x(d.etime)})
				.y(function(d) {return y(d.emag)})				

			svg.append('path')
				.data([data])
				.attr('class', 'line')
				.attr('d', value_line(data))

			// APPEND X AXIS
			svg.append('g')
				.attr("class", "x axis")
				.call(d3.axisBottom(x_axis))
				.attr('transform', 'translate(0,' + height + ')')
				.append('text')
				.attr('fill', '#E1ECA5')				
				.attr('x', 0)
				.attr('dx', '1.5em')
				.attr('dy', '2.5em')
				.attr('text-anchor', 'end')
				.attr("font-size", 20)
				.text('Time');

			// APPEND THE Y AXIS
			svg.append('g')				
				.call(d3.axisLeft(y))
				.append("text")
			    .attr("fill", "#E1ECA5")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 0)
			    .attr("dy", "-2.5em")
			    .attr("text-anchor", "end")
			    .attr("font-size", 20)
			    .attr("letter-spacing", 2)
			    .text("Magnitude");

	}

	render() {		
		return (
			<div className='line-graph'>
				
			</div>
		)
	}
}

export default Linechart;





